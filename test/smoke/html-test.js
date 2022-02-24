const mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const glob = require('glob-all');

mocha.describe('Checking if html file generate successful', () => {
  it('should generate html file', (done) => {
    console.log(process.cwd());
    const files = glob.sync('./dist/main.html')
    console.log(files);
    if (files.length) {
      done()
    } else {
      throw new Error('html file doesn\'t generated')
    }
  })
})