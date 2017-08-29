/* eslint-env node */
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new DotenvPlugin({
        sample: './.env.example',
        path: './.env'
      })
    );

    // For the development version, we'll use React.
    // Because, it supports react hot loading and so on.
    if (dev) {
      return config;
    }

    config.resolve.alias = {
      react: 'preact-compat/dist/preact-compat',
      'react-dom': 'preact-compat/dist/preact-compat'
    };

    return config;
  }
};
