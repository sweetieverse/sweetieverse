'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('./firebase');

Object.defineProperty(exports, 'FirebaseService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_firebase).default;
  }
});

var _product = require('./product');

Object.defineProperty(exports, 'ProductService', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_product).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }