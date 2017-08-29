/* eslint-env node */
const compression = require('compression');
const express = require('express');
const moduleAlias = require('module-alias');
const next = require('next');

require('dotenv-safe').load();

const api = require('./api');
const feeds = require('./feeds');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const gsv = `${process.env.GOOGLE_SITE_VERIFICATION}.html`;

if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat');
  moduleAlias.addAlias('react-dom', 'preact-compat');
}

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.use(compression());

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
