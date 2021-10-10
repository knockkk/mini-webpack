(function (modules) {
  const module_cache = {};
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      return require(mapping[name]);
    }

    const cachedModule = module_cache[id];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }

    const module = (module_cache[id] = {
      exports: {},
    });

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require('./example/entry.js');
})({
  './example/entry.js': [
    function (require, module, exports) {
      'use strict';

      var _message = _interopRequireDefault(require('./message.js'));

      require('./utils/index.js');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_message['default']);
    },
    {
      './message.js': './example/message.js',
      './utils/index.js': './example/utils/index.js',
    },
  ],
  './example/message.js': [
    function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports['default'] = void 0;

      var _name = require('./name.js');

      var _default = 'hello '.concat(_name.name, '!');

      exports['default'] = _default;
    },
    { './name.js': './example/name.js' },
  ],
  './example/utils/index.js': [
    function (require, module, exports) {
      'use strict';

      var _name = require('../name.js');
    },
    { '../name.js': './example/name.js' },
  ],
  './example/name.js': [
    function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.name = void 0;

      var _message = require('./message.js');

      // 测试循环依赖
      var name = 'world';
      exports.name = name;
    },
    { './message.js': './example/message.js' },
  ],
});
