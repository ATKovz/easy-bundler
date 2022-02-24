const mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const glob = require('glob-all');

mocha.describe('Checking if css/js file generate successful', () => {
  it('should generate css/js file', (done) => {
      const files = glob.sync([
        './dist/main_*.js',
        './dist/main_*.css',
      ])
      if (files.length) {
        done()
      } else {
        throw new Error('css/js file doesn\'t generated')
      }
  })
})