import mysql from 'mysql2/promise';

/**
 * Creates connection pool for MySQL to handle queries efficiently.
 * You must ensure these variables are defined in your .env file
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'murjan_ai',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Helper function to retrieve a specific API key securely from the database
 * 
 * @param {string} keyName The name of the key (e.g., 'gemini_api_key')
 * @returns {Promise<string|null>} The key value or null if not found
 */
export async function getApiKey(keyName) {
  try {
    const [rows] = await pool.query(
      'SELECT key_value FROM api_keys WHERE key_name = ? LIMIT 1',
      [keyName]
    );

    if (rows.length > 0) {
      return rows[0].key_value;
    }
    return null;
  } catch (error) {
    console.error(`[MySQL Error] Failed to fetch API key "${keyName}":`, error.message);
    return null;
  }
}
