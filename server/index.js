'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routers
// import router from './routes';
// import publicRouter from './publicRoutes';

// ===========
// express
// ===========

module.exports = function () {
  // instance of express
  var app = (0, _express2.default)();

  // if we are on a production environment we are likely behind a proxy
  if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
  }

  // disallow OPTIONS calls
  app.all('*', function (req, res, next) {
    if (req.method === 'OPTIONS') {
      res.status(409).end();
    } else {
      next();
    }
  });

  // such easy params
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));

  // such easy cookies
  app.use((0, _cookieParser2.default)());

  // serve static files (html, js, css, images, etc)
  app.use(_express2.default.static(_path2.default.join(__dirname, '../public'), {
    index: 'index.html',
    redirect: false
  }));

  // serve static files (html, js, css, images, etc)
  app.use(_express2.default.static(_path2.default.join(__dirname, '../store-config'), {
    redirect: false
  }));

  // serve static files (html, js, css, images, etc)
  app.use(_express2.default.static(_path2.default.join(__dirname, '../assets'), {
    redirect: false
  }));

  app.get('/s/:storeName/index.json', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var resp, sections;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _axios2.default.get('https://unpkg.com/@sweetiebird/subverse@0.0.3/items/index.json');

            case 2:
              resp = _context.sent;
              sections = resp.data.sections;
              return _context.abrupt('return', res.json({ items: sections }));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  // register route handlers
  // app.use('/api', router);
  // app.use('/users', publicRouter);

  // serve the index.html over all unmatched Routes.js
  // app.get('*', (req, res) => {
  //   res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
  // });

  // handle errors - Last middleware to catch all
  app.use(function (err, req, res, next) {
    if (err) {
      // log the request with error noted
      console.error('ERROR - %s, %s', req.method, req.url);

      // log the stack trace
      console.error(err.stack);

      // determine if we want to return the error message to user
      var errorMessage = void 0;
      if (process.env.NODE_ENV === 'development') {
        errorMessage = err.message;
      }

      res.status(400).send(errorMessage);
    }

    next();
  });

  return app;
};