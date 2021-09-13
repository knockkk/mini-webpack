(function (modules) {
  function require(id) {
    //🌟
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      //⏰
      return require(mapping[name]); //🌟
    }

    const module = { exports: {} };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  6: [
    function (require, module, exports) {
      'use strict';

      var _message = _interopRequireDefault(require('./message.js'));

      var _name = require('./name.js');

      var _a = require('./utils/a.js');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_message['default'], _name.name, _a.a);
    },
    { './message.js': 7, './name.js': 8, './utils/a.js': 9 },
  ],
  7: [
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
    { './name.js': 10 },
  ],
  8: [
    function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.name = void 0;
      var name = 'world';
      exports.name = name;
    },
    {},
  ],
  9: [
    function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.a = void 0;

      var _name = require('../name.js');

      var a = 'aaa';
      exports.a = a;
    },
    { '../name.js': 11 },
  ],
  10: [
    function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.name = void 0;
      var name = 'world';
      exports.name = name;
    },
    {},
  ],
  11: [
    function (require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports.name = void 0;
      var name = 'world';
      exports.name = name;
    },
    {},
  ],
});
