import { handle } from 'hono/cloudflare-pages';
import app from '../../server/app.js';

// This turns the Hono app into standard Cloudflare Pages Functions
export const onRequest = handle(app);
