import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import axios from 'axios';

// routers
// import router from './routes';
// import publicRouter from './publicRoutes';

// ===========
// express
// ===========

module.exports = () => {
  // instance of express
  const app = express();

  // if we are on a production environment we are likely behind a proxy
  if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
  }

  // disallow OPTIONS calls
  app.all('*', (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.status(409).end();
    } else {
      next();
    }
  });

  // such easy params
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  // such easy cookies
  app.use(cookieParser());

  // serve static files (html, js, css, images, etc)
  app.use(express.static(path.join(__dirname, '../public'), {
    index: 'index.html',
    redirect: false,
  }));

  // serve static files (html, js, css, images, etc)
  app.use(express.static(path.join(__dirname, '../store-config'), {
    redirect: false,
  }));

  // sere css
  app.use(express.static(path.join(__dirname, '../assets/css'), {
    redirect: false,
  }));

  // serve static files (html, js, css, images, etc)
  app.use(express.static(path.join(__dirname, '../assets'), {
    redirect: false,
  }));

  app.get('/s/:storeName/index.json', async (req, res) => {
    const resp = await axios.get('https://unpkg.com/@sweetiebird/subverse@0.0.3/items/index.json');
    const { data: { sections } } = resp;
    return res.json({ items: sections });
  });

  // register route handlers
  // app.use('/api', router);
  // app.use('/users', publicRouter);

  // serve the index.html over all unmatched Routes.js
  // app.get('*', (req, res) => {
  //   res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
  // });

  // handle errors - Last middleware to catch all
  app.use((err, req, res, next) => {
    if (err) {
      // log the request with error noted
      console.error('ERROR - %s, %s', req.method, req.url);

      // log the stack trace
      console.error(err.stack);

      // determine if we want to return the error message to user
      let errorMessage;
      if (process.env.NODE_ENV === 'development') {
        errorMessage = err.message;
      }

      res.status(400).send(errorMessage);
    }

    next();
  });

  return app;
};
