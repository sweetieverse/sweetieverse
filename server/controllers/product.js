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

var _utils = require('../utils');

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductController = function () {
  function ProductController() {
    (0, _classCallCheck3.default)(this, ProductController);
  }

  (0, _createClass3.default)(ProductController, null, [{
    key: 'getProduct',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var productId, prodConfig;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                productId = req.params.productId;
                _context.next = 3;
                return _services.ProductService.getProductConfig(productId);

              case 3:
                prodConfig = _context.sent;
                return _context.abrupt('return', (0, _utils.SuccessResponse)(res, prodConfig));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProduct(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getProduct;
    }()
  }]);
  return ProductController;
}();

exports.default = ProductController;