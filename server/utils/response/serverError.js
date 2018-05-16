'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// authentication error response
exports.default = function (res, message) {
  res.status(500).json({
    errors: [{
      status: 500,
      title: 'Server error',
      detail: message || 'Something blew up'
    }]
  });
};