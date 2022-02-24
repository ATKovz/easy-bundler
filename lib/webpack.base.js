// 负责解析资源
const path = require('path');
const MiniCssPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const getMpaConfig = require('./utils/getMPA');

const projectRoot = process.cwd()

const { entry, htmlPlugins } = getMpaConfig(projectRoot);

const errorHandler = function () {
  this.hooks.done.tap('done', (stats) => {
    if (stats.compilation.errors?.length && process.argv.indexOf('--watch') === -1) {
      console.log('build, error');
      process.exit(5);
      // 随后可以在 cli echo $? 来获取 error code进行下一步操作
    }
  });
};

const cssLoaders = [
  {
    test: /\.css$/,
    use: [
      MiniCssPlugin.loader,
      { loader: 'css-loader', options: { modules: true } },
      { loader: 'postcss-loader', options: {} },
    ],
  },
  {
    test: /\.less$/,
    use: [
      MiniCssPlugin.loader,
      { loader: 'css-loader', options: { modules: true } },
      { loader: 'less-loader', options: {} },
      { loader: 'postcss-loader', options: {} },
    ],
  },
];

const imgLoaders = [
  {
    // image
    test: /\.(svg|png|jpg|jpeg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024 * 10,
        },
      },
      {
        loader: 'file-loader',
        options: {
          filename: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
];

const fontLoaders = [

  {
    // font
    test: /\.(woff|eof|tof)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          filename: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
];

const codeLoaders = [
  {
    test: /\.(ts|js|jsx|tsx)$/,
    use: [
      { loader: 'babel-loader' },
    ],
  },
];

const config = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:9].js',
  },
  module: {
    rules: [
      ...cssLoaders,
      ...imgLoaders,
      ...fontLoaders,
      ...codeLoaders,
    ],
  },
  plugins: [
    new MiniCssPlugin({
      filename: '[name]_[hash:8].css',
    }),
    new CleanPlugin(),
    new FriendlyErrorsPlugin(),
    errorHandler,
    ...htmlPlugins,
  ],
  // stats: 'errors-only',
};

module.exports = config;
