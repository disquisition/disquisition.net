/* eslint-env node */
const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());

routes.add('about', '/', 'index');
routes.add('blog', '/blog');
routes.add('post', '/blog/:slug');
