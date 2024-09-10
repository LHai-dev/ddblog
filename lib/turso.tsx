import { createClient } from '@libsql/client';

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variables');
}

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL as string, // Assert that it's a string
  authToken: process.env.TURSO_AUTH_TOKEN as string, // Assert that it's a string
});
