import { env } from 'hono/adapter';

let pool;

/**
 * Robustly retrieve an API key from the environment.
 * If not found, falls back to the local MySQL database.
 */
export async function getApiKey(c, keyName) {
  let key = null;

  try {
    const contextEnv = c ? env(c) : {};
    const upperName = keyName.toUpperCase();
    
    // Check various casing/source options
    key = contextEnv[upperName] || contextEnv[keyName] || 
          process.env[upperName] || process.env[keyName];
          
    if (key && typeof key === 'string') {
      key = key.trim();
      const isPlaceholder = 
        key.includes('(Replace this') || 
        key.includes('PLACEHOLDER') || 
        key.includes('REPLACE_ME') ||
        key.includes('YOUR_KEY');
        
      if (!isPlaceholder) {
        return key;
      } else {
        // console.log(`[Key Source] Found placeholder for ${keyName} in env, skipping...`);
      }
    }
  } catch (error) {
    // console.warn(`Error resolving API key environment variables for ${keyName}`);
  }

  // Fallback to MySQL Database (Local PhpMyAdmin Support)
  try {
    // We mask the import to prevent Cloudflare's bundler from crashing
    const getMysql = new Function("return import('mysql2/promise')");
    const mysql = await getMysql();
    
    if (!pool) {
      pool = mysql.createPool({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USERNAME || process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || process.env.DB_NAME || 'murjan_ai',
        waitForConnections: true,
        connectionLimit: 5
      });
    }

    const [rows] = await pool.query(
      'SELECT key_value FROM api_keys WHERE key_name = ? LIMIT 1',
      [keyName]
    );

    if (rows && rows[0] && rows[0].key_value) {
      const dbKey = rows[0].key_value.trim();
      if (!dbKey.includes('(Replace this')) {
        console.log(`[DB SUCCESS] Loaded ${keyName} (Length: ${dbKey.length})`);
        return dbKey;
      }
    }
  } catch (error) {
    if (!process.env.DB_HOST) {
       // Cloudflare environment: ignore error silently
    } else {
       console.error(`[DB Error] Failed to fetch "${keyName}":`, error.message);
    }
  }

  return null;
}

