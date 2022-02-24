const { merge } = require('webpack-merge');
// 压缩css
const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',
};

module.exports = merge(baseConfig, config);
