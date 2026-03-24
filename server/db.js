import { env } from 'hono/adapter';

/**
 * Robustly retrieve an API key from the environment.
 * (Database fallback permanently removed for full Cloudflare compatibility)
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
      if (!key.includes('(Replace this')) return key;
    }
  } catch (error) {
    console.warn(`Error resolving API key environment variables for ${keyName}`);
  }

  return null;
}

