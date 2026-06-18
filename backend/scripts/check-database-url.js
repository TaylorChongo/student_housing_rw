require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

let parsed;

try {
  parsed = new URL(databaseUrl);
} catch {
  console.error('DATABASE_URL is not a valid URL.');
  process.exit(1);
}

if (!['postgresql:', 'postgres:'].includes(parsed.protocol)) {
  console.error(`DATABASE_URL must start with postgresql:// or postgres://. Found protocol: ${parsed.protocol || '(none)'}`);
  process.exit(1);
}

console.log(`DATABASE_URL target: ${parsed.protocol}//${parsed.hostname}:${parsed.port || '5432'}${parsed.pathname}`);

if (parsed.hostname.startsWith('db.') && parsed.hostname.endsWith('.supabase.co')) {
  console.warn(
    'Warning: this is Supabase direct Postgres. Render commonly cannot reach it because it is IPv6-only. Use the Supabase Session pooler host instead.'
  );
}
