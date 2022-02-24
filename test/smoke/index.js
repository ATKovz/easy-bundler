const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const Mocha = require('mocha')

process.chdir(path.join(__dirname, 'template'))

const m = new Mocha({
  timeout: 10000,
})

rimraf('./dist', (err) => {
  const prodConfig = require('../../lib/webpack.prod')
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log(err);
      process.exit(2)
    } else {
      console.log(stats.toString({
        colors: true,
        modules:  true,
      }));
      // 打包后自动冒烟测试
      console.log('Webpack build success, then project will starting unit test');
      m.addFile(path.join(__dirname, 'css-test.js'))
      m.addFile(path.join(__dirname, 'html-test.js'))
      m.run()
    }
  })
})
