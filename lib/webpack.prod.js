const merge = require('webpack-merge').merge;
// 压缩css
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const ExternalPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        commons: {
          // 如果和 entry 冲突，entry 会被删除
          name: 'commons',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new OptimizeCssPlugin({
      assetNameRegExp: /\.css$/,
    }),
    new ExternalPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
};

module.exports = merge(baseConfig, config);
