// Usage: npm run hash-password -- "your-strong-password"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Provide a password of at least 12 characters:\n  npm run hash-password -- \"your-strong-password\"");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`\nADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
console.log(`AUTH_SECRET=${randomBytes(32).toString("base64url")}\n`);
