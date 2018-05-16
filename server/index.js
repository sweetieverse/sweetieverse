'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

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