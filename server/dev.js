/**
 * Local development server only.
 * In production, Cloudflare Pages routes /api/* through /functions/api/[[route]].js instead.
 *
 * Run via:  node server/dev.js
 */

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import app from './app.js';

// Mount local app under /api to match what the Vite proxy forwards
const localApp = new Hono().basePath('/api');
localApp.route('/', app);

const PORT = process.env.PORT || 3001;

serve({ fetch: localApp.fetch, port: PORT }, () => {
  console.log(`✅ Local backend proxy running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY)     console.warn('⚠️  GEMINI_API_KEY is not set');
  if (!process.env.OPENROUTER_API_KEY) console.warn('⚠️  OPENROUTER_API_KEY is not set');
});
