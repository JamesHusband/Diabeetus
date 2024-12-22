/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { createLibreRoutes } from '@diabetus/data-access/libre';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Mount example API routes under /api prefix
app.use('/api', createLibreRoutes());

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
