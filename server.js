/* eslint-env node */
const express = require('express');
const next = require('next');

const api = require('./api');
const routes = require('./routes');

require('dotenv-safe').load();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.use('/api', api);

  server.use(handler);

  server.listen(3000, () => {
    console.log('Server listing on http://localhost:3000');
  });
});
