import { handle } from 'hono/cloudflare-pages';
import { Hono } from 'hono';
import app from '../../server/app.js';

// Cloudflare Pages calls /api/... → this function strips the /api prefix
// and passes it to our Hono app, which routes /chat/gemini, etc.
const pagedApp = new Hono().basePath('/api');
pagedApp.route('/', app);

export const onRequest = handle(pagedApp);
