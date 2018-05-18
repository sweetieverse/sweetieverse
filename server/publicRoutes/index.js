'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

var router = (0, _express.Router)();

router.get('/:userId', _controllers.UserController.publicGetUser);

router.get('/ping', function (req, res) {
  res.status(200).send('pong');
});

exports.default = router;