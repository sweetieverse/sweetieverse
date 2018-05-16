'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

var router = (0, _express.Router)();

router.post('/:userId/purchases', _controllers.UserController.savePurchase);

exports.default = router;