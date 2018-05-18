'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _product = require('./product');

var _product2 = _interopRequireDefault(_product);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use('/products', _product2.default);
router.use('/users', _user2.default);

router.get('/ping', function (req, res) {
  res.status(200).send('pong');
});

exports.default = router;