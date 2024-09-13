import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';
import * as schema from './schema';

// Check if environment variables exist
if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variables');
}

// Create the Turso client using environment variables
export const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string, // Ensure it's a string
  authToken: process.env.TURSO_AUTH_TOKEN as string, // Ensure it's a string
});

export const db = drizzle(client, { schema });



