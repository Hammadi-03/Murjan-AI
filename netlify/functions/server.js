import serverless from 'serverless-http';
import app from '../../server/app.js';

// Wraps the Express application into a handler format that Netlify AWS Lambdas can understand.
export const handler = serverless(app, { basePath: '/.netlify/functions/server' });
