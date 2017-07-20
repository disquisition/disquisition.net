/* eslint-env node */
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: config => {
    config.plugins.push(
      new Dotenv({
        safe: true
      })
    );

    return config;
  }
};
