/* eslint-env node */
const express = require('express');
const next = require('next');

require('dotenv-safe').load();

const api = require('./api');
const feeds = require('./feeds');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const gsv = `${process.env.GOOGLE_SITE_VERIFICATION}.html`;

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.get(`/${gsv}`, (req, res) => {
    res.send(`google-site-verification: ${gsv}`);
  });

  server.use('/api', api);

  server.use('/feeds', feeds);

  server.use(handler);

  server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server listing on http://localhost:3000');
  });
});
