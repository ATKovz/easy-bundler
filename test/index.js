const assert = require("assert");
const path = require("path");

process.chdir(path.join(__dirname, './smoke/template'))

const baseConfig = require('../lib/webpack.base')
const devConfig = require('../lib/webpack.dev')

describe('check if mocha can run', () => {
  it('mocha can run', (done) => {
    done()
  })
  it('check if base config running', (done) => {
    assert.equal(baseConfig.entry.main, './src/pages/main/index.jsx')
    done()
  })
})