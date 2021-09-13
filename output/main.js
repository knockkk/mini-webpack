(function (graph) {
  function require(module) {
    function localRequire(relativePath) {
      return require(graph[module].dependecies[relativePath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[module].code);
    return exports;
  }
  require('./example/entry.js');
})({
  './example/entry.js': {
    dependecies: {
      './message.js': './example/message.js',
      './name.js': './example/name.js',
      './utils/a.js': './example/utils/a.js',
    },
    code: '"use strict";\n\nvar _message = _interopRequireDefault(require("./message.js"));\n\nvar _name = require("./name.js");\n\nvar _a = require("./utils/a.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nconsole.log(_message["default"], _name.name, _a.a);',
  },
  './example/message.js': {
    dependecies: { './name.js': './example/name.js' },
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\nvar _name = require("./name.js");\n\nvar _default = "hello ".concat(_name.name, "!");\n\nexports["default"] = _default;',
  },
  './example/name.js': {
    dependecies: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.name = void 0;\nvar name = \'world\';\nexports.name = name;',
  },
  './example/utils/a.js': {
    dependecies: { '../name.js': './example/name.js' },
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.a = void 0;\n\nvar _name = require("../name.js");\n\nvar a = \'aaa\';\nexports.a = a;',
  },
});
