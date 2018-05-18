"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// success response object
exports.default = function (res, data) {
  res.status(200).json({
    meta: {
      code: 200
    },
    data: data
  });
};