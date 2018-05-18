'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _packageJson = require('package-json');

var _packageJson2 = _interopRequireDefault(_packageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductService = function () {
  function ProductService() {
    (0, _classCallCheck3.default)(this, ProductService);
  }

  (0, _createClass3.default)(ProductService, null, [{
    key: 'getProductConfig',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(productId) {
        var config;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _packageJson2.default)(productId, {
                  fullMetadata: true
                });

              case 2:
                config = _context.sent;
                return _context.abrupt('return', config.sweetiebird ? config.sweetiebird : {});

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProductConfig(_x) {
        return _ref.apply(this, arguments);
      }

      return getProductConfig;
    }()
  }]);
  return ProductService;
}();

exports.default = ProductService;