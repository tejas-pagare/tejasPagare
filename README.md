This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog & admin

Posts are written at `/admin` (protected) and published at `/blog`.

1. Generate credentials:
   ```bash
   npm run hash-password -- "your-strong-password"
   ```
2. Copy `.env.example` to `.env.local` and fill in `ADMIN_EMAIL`, plus the
   `ADMIN_PASSWORD_HASH` and `AUTH_SECRET` printed above. Add the same variables
   to your hosting provider.
3. Storage: without `MONGODB_URI`, posts are saved to `data/posts.json` (local
   dev only). Set `MONGODB_URI` (e.g. a free MongoDB Atlas cluster) in production.
4. Images (optional): set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and
   `CLOUDINARY_API_SECRET` to upload a cover image, or paste/drop images into the
   editor. Uploads go straight from the browser to Cloudinary using a signature
   that only a signed-in admin can get. Without these, you can still paste image URLs.
5. Visit `/admin/login`, sign in, and write in Markdown with live preview.
   Drafts are only visible to you; `⌘S` saves.
