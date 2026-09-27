import "server-only";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { MongoClient, type Collection } from "mongodb";
import type { Post, PostInput } from "./types";

/**
 * Post storage. Uses MongoDB when MONGODB_URI is set (required for serverless
 * deployments such as Vercel), otherwise falls back to a local JSON file so the
 * blog works in development with zero setup.
 */
interface PostStore {
  list(opts?: { includeDrafts?: boolean }): Promise<Post[]>;
  getBySlug(slug: string): Promise<Post | null>;
  getById(id: string): Promise<Post | null>;
  create(input: PostInput): Promise<Post>;
  update(id: string, input: PostInput): Promise<Post | null>;
  remove(id: string): Promise<void>;
}

function sortNewestFirst(posts: Post[]): Post[] {
  return posts.sort((a, b) =>
    (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt)
  );
}

function applyUpdate(existing: Post, input: PostInput): Post {
  const now = new Date().toISOString();
  return {
    ...existing,
    ...input,
    updatedAt: now,
    publishedAt:
      input.status === "published" ? existing.publishedAt ?? now : existing.publishedAt,
  };
}

function newPost(input: PostInput): Post {
  const now = new Date().toISOString();
  return {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : undefined,
  };
}

/* ---------------------------------- File ---------------------------------- */

const FILE_PATH = path.join(process.cwd(), "data", "posts.json");

async function readFile(): Promise<Post[]> {
  try {
    return JSON.parse(await fs.readFile(FILE_PATH, "utf8")) as Post[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeFile(posts: Post[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");
}

const fileStore: PostStore = {
  async list({ includeDrafts = false } = {}) {
    const posts = await readFile();
    return sortNewestFirst(includeDrafts ? posts : posts.filter((p) => p.status === "published"));
  },
  async getBySlug(slug) {
    return (await readFile()).find((p) => p.slug === slug) ?? null;
  },
  async getById(id) {
    return (await readFile()).find((p) => p.id === id) ?? null;
  },
  async create(input) {
    const posts = await readFile();
    const post = newPost(input);
    await writeFile([...posts, post]);
    return post;
  },
  async update(id, input) {
    const posts = await readFile();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    posts[idx] = applyUpdate(posts[idx], input);
    await writeFile(posts);
    return posts[idx];
  },
  async remove(id) {
    await writeFile((await readFile()).filter((p) => p.id !== id));
  },
};

/* --------------------------------- MongoDB -------------------------------- */

type PostDoc = Post & { _id?: unknown };

// Cached across hot reloads and serverless invocations.
const globalForMongo = globalThis as unknown as {
  _mongoCollection?: Promise<Collection<PostDoc>>;
};

async function connect(): Promise<Collection<PostDoc>> {
  const client = await new MongoClient(process.env.MONGODB_URI!, {
    serverSelectionTimeoutMS: 5000,
    appName: "portfolio-blog",
  }).connect();
  const col = client.db(process.env.MONGODB_DB || "portfolio").collection<PostDoc>("posts");
  await Promise.all([
    col.createIndex({ id: 1 }, { unique: true }),
    col.createIndex({ slug: 1 }, { unique: true }),
    col.createIndex({ status: 1, publishedAt: -1 }),
  ]);
  return col;
}

function collection(): Promise<Collection<PostDoc>> {
  if (!globalForMongo._mongoCollection) {
    globalForMongo._mongoCollection = connect().catch((err) => {
      // Don't cache a failed connection; the next request retries.
      globalForMongo._mongoCollection = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoCollection;
}

const PROJECTION = { projection: { _id: 0 } } as const;

const mongoStore: PostStore = {
  async list({ includeDrafts = false } = {}) {
    const col = await collection();
    const posts = await col.find(includeDrafts ? {} : { status: "published" }, PROJECTION).toArray();
    return sortNewestFirst(posts as Post[]);
  },
  async getBySlug(slug) {
    return (await (await collection()).findOne({ slug }, PROJECTION)) as Post | null;
  },
  async getById(id) {
    return (await (await collection()).findOne({ id }, PROJECTION)) as Post | null;
  },
  async create(input) {
    const post = newPost(input);
    await (await collection()).insertOne({ ...post });
    return post;
  },
  async update(id, input) {
    const col = await collection();
    const existing = (await col.findOne({ id }, PROJECTION)) as Post | null;
    if (!existing) return null;
    const updated = applyUpdate(existing, input);
    await col.replaceOne({ id }, updated);
    return updated;
  },
  async remove(id) {
    await (await collection()).deleteOne({ id });
  },
};

export const posts: PostStore = process.env.MONGODB_URI ? mongoStore : fileStore;
