'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// authentication error response
exports.default = function (res, message) {
  res.status(401).json({
    errors: [{
      status: 401,
      title: 'Login failed',
      detail: message || 'User login attempt failed'
    }]
  });
};