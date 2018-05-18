'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var next = require('next');
var exp = require('express');
var packageJson = require('package-json');
var path = require('path');
var axios = require('axios');

var express = void 0;

var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();

if (dev) {
  express = require('./api'); // eslint-disable-line
} else {
  express = require('./server/index'); // eslint-disable-line
}

app.prepare().then(function () {
  var server = express();

  server.use(exp.static(path.join(__dirname, './assets/css'), {
    redirect: false
  }));

  server.get('/s/:storeName/:productName/:addon', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var _req$params, productName, storeName, addon, queryParams, pkgName, pkgData;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$params = req.params, productName = _req$params.productName, storeName = _req$params.storeName, addon = _req$params.addon;
              queryParams = {};
              _context.prev = 2;
              pkgName = storeName + '-' + productName + '-' + addon;
              _context.next = 6;
              return packageJson(pkgName, {
                fullMetadata: true
              });

            case 6:
              pkgData = _context.sent;

              queryParams = (0, _extends3.default)({}, pkgData.sweetieverse, {
                identifier: pkgData.name,
                slug: '/s/' + storeName + '/' + productName + '/' + addon
              });
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](2);

              console.log(_context.t0); // todo: log this to loggly, etc

            case 13:
              return _context.abrupt('return', app.render(req, res, '/addon', queryParams));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 10]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  server.get('/s/:storeName/:productName', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var _req$params2, productName, storeName, queryParams, pkgName, pkgData;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$params2 = req.params, productName = _req$params2.productName, storeName = _req$params2.storeName;
              queryParams = {};
              _context2.prev = 2;
              pkgName = storeName + '-' + productName;
              _context2.next = 6;
              return packageJson(pkgName, {
                fullMetadata: true
              });

            case 6:
              pkgData = _context2.sent;

              queryParams = (0, _extends3.default)({}, pkgData.sweetieverse, {
                identifier: pkgData.name,
                slug: '/s/' + storeName + '/' + productName
              });
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](2);

              console.log(_context2.t0); // todo: log this to loggly, etc

            case 13:
              return _context2.abrupt('return', app.render(req, res, '/product', queryParams));

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 10]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  server.get('/s/:storeName', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var storeName, pkgData, xml, modelUrl, _ref4, data, queryParams;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              storeName = req.params.storeName;
              pkgData = {};
              xml = '';
              _context3.prev = 3;
              _context3.next = 6;
              return packageJson(storeName, {
                fullMetadata: true
              });

            case 6:
              pkgData = _context3.sent;
              modelUrl = pkgData.sweetieverse.model;
              _context3.next = 10;
              return axios.get(modelUrl);

            case 10:
              _ref4 = _context3.sent;
              data = _ref4.data;

              xml = (0, _stringify2.default)(data);
              _context3.next = 18;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3['catch'](3);

              console.log(_context3.t0); // todo: log this to loggly, etc

            case 18:
              queryParams = pkgData.sweetieverse ? (0, _extends3.default)({}, pkgData.sweetieverse, {
                identifier: pkgData.name,
                slug: '/s/' + storeName,
                model: xml
              }) : {};
              return _context3.abrupt('return', app.render(req, res, '/', queryParams));

            case 20:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[3, 15]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  server.get('*', function (req, res) {
    return handle(req, res);
  });

  server.listen(port, function (err) {
    if (err) throw err;
    console.log('> Ready on http://localhost:' + port);
  });
});
