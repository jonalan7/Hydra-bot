const path = require('path');

module.exports = {
  entry: './api.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../../../dist/webpack/assets'),
    filename: 'api.js',
  },
};
