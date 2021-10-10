const options = require('../webpack.config');
const Compiler = require('./compiler');

new Compiler(options).run();
