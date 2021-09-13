const path = require('path');
module.exports = {
  entry: './example/entry.js',
  output: {
    path: path.resolve(__dirname, './output'),
    filename: 'main.js',
  },
};
