/* eslint-env node */
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  webpack: config => {
    config.plugins.push(
      new DotenvPlugin({
        sample: './.env.example',
        path: './.env'
      })
    );

    return config;
  }
};
