import { handle } from 'hono/netlify';
import { Hono } from 'hono';
import app from '../../server/app.js';

// The Hono app is already set up in /server/app.js.
// We mount it under /api to match the Vite proxy and our redirects.
const apiApp = new Hono().basePath('/api');
apiApp.route('/', app);

export const handler = handle(apiApp);
