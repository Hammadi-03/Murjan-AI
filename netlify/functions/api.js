import { handle } from 'hono/netlify';
import app from '../../server/app.js';

// Netlify redirects /api/* to this function using :splat.
// So /api/tags becomes /tags here, matching our Hono routes correctly.
export const handler = handle(app);
