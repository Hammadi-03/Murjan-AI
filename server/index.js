/**
 * Local Express Runner
 * Only used when running `npm run dev` locally.
 * In production (Netlify), this file is ignored, and Netlify invokes `/server/app.js` via `/netlify/functions/server.js`.
 */

import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Local backend proxy running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY)      console.warn('⚠️  GEMINI_API_KEY is not set');
  if (!process.env.OPENROUTER_API_KEY)  console.warn('⚠️  OPENROUTER_API_KEY is not set');
});
