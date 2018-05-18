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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../utils');

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-dynamic-require */
// const config = require(path.resolve(__dirname, '../../sweetiebird'));
/* eslint-enable import/no-dynamic-require */

var UserController = function () {
  function UserController() {
    (0, _classCallCheck3.default)(this, UserController);
  }

  (0, _createClass3.default)(UserController, null, [{
    key: 'publicGetUser',

    // public routes

    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var userId, purchases;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.params.userId;
                _context.next = 3;
                return _services.FirebaseService.getUserPurchases(userId);

              case 3:
                purchases = _context.sent;

                (0, _utils.SuccessResponse)(res, purchases);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function publicGetUser(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return publicGetUser;
    }()

    // api routes

  }, {
    key: 'savePurchase',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var userId, _req$body, purchase, product, guid;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.params.userId;
                _req$body = req.body, purchase = _req$body.purchase, product = _req$body.product, guid = _req$body.guid;
                _context2.next = 4;
                return _services.FirebaseService.saveUserPurchase(userId, purchase, product, guid);

              case 4:
                return _context2.abrupt('return', (0, _utils.SuccessResponse)(res, { status: 'SUCCESS' }));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savePurchase(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return savePurchase;
    }()
  }]);
  return UserController;
}();

exports.default = UserController;