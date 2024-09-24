import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

const { NEXT_PUBLIC_SUPABASE_URL } = process.env;

if (!NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
}

// Parse the connection string
const url = new URL(NEXT_PUBLIC_SUPABASE_URL);
const [username, password] = url.username.split(':');

export default {
  schema: './src/db/schema.ts',  // Updated path
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port, 10),
    user: username,
    password: password,
    database: url.pathname.slice(1),  // remove leading '/'
    ssl: { rejectUnauthorized: false },
  },
} satisfies Config;