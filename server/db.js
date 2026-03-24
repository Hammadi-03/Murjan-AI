import { env } from 'hono/adapter';

// Use a lazy-loaded connection pool to avoid issues on platforms that don't support MySQL (like Cloudflare Pages)
let pool;

/**
 * Creates connection pool for MySQL to handle queries efficiently.
 * Only called if an API key is not found in the environment.
 */
async function getPool() {
  if (pool) return pool;
  
  // Only attempt to load mysql2 if we really need it (local dev fallback)
  try {
    const mysql = await import('mysql2/promise');
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'murjan_ai',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    return pool;
  } catch (error) {
    console.warn('[DB] MySQL driver not available or connection failed; skipping database fallback.');
    return null;
  }
}

/**
 * Helper function to retrieve a specific API key securely.
 * Prioritizes Cloudflare/Hono environment variables, then Node.js env, then MySQL database.
 * 
 * @param {object} c The Hono context
 * @param {string} keyName The name of the key (e.g., 'gemini_api_key')
 * @returns {Promise<string|null>} The key value or null if not found
 */
export async function getApiKey(c, keyName) {
  // 1. Try Hono context env (Cloudflare / Hono-standard)
  if (c) {
    const contextEnv = env(c);
    const upperKey = keyName.toUpperCase();
    const val = contextEnv[upperKey] || contextEnv[keyName];
    if (val && !val.includes('(Replace this')) return val;
  }

  // 2. Try Node process.env (Local dev / Node-standard)
  if (typeof process !== 'undefined' && process.env) {
    const upperKey = keyName.toUpperCase();
    const nodeVal = process.env[upperKey] || process.env[keyName];
    if (nodeVal && !nodeVal.includes('(Replace this')) return nodeVal;
  }

  // 3. Fallback to MySQL if configured (Legacy/Local development)
  try {
    const dbPool = await getPool();
    if (dbPool) {
      const [rows] = await dbPool.query(
        'SELECT key_value FROM api_keys WHERE key_name = ? LIMIT 1',
        [keyName]
      );
      if (rows.length > 0 && rows[0].key_value && !rows[0].key_value.includes('(Replace this')) {
        return rows[0].key_value;
      }
    }
  } catch (error) {
    console.error(`[MySQL Error] Failed to fetch API key "${keyName}":`, error.message);
  }

  return null;
}
