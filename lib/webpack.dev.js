const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  devtool: 'eval-cheap-source-map',
  devServer: {
    hot: true,
    port: 8601,
    static: './dist',
  },
};

module.exports = merge(baseConfig, config);
