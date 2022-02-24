const path = require('path');
const glob = require('glob');
const HtmlPlugin = require('html-webpack-plugin');

/**
 * generate config
 * @typedef {{ entry: { [key: string]: string }, htmlPlugins: any[] }} Config
 * @returns {Config}
 */
const getMpaConfig = (root) => {
  const pattern = './src/pages/*/index.*';

  const file = glob.sync(pattern);
  const matchReg = /pages\/(.*)\/index/;

  const config = file
    .reduce((memo, curr) => {
      const entryName = matchReg.exec(curr)[1];
      if (entryName) {
        return {
          entry: {
            ...memo.entry,
            [entryName]: curr,
          },
          htmlPlugins: [
            ...memo.htmlPlugins,
            new HtmlPlugin({
              template: path.join(root, 'src/template/main.ejs'),
              chunks: [entryName],
              filename: `${entryName}.html`,
              minify: {
                minifyCSS: true,
                minifyJS: true,
                // collapseWhitespace: true,
                html5: true,
              },
            }),
          ],
        };
      }
      return memo;
    }, {
      entry: {},
      htmlPlugins: [],
    });

  return config;
};

module.exports = getMpaConfig;
