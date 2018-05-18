'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = require('./product');

Object.defineProperty(exports, 'ProductController', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_product).default;
  }
});

var _user = require('./user');

Object.defineProperty(exports, 'UserController', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_user).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }