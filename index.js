const next = require('next');
const exp = require('express');
const packageJson = require('package-json');
const path = require('path');
const axios = require('axios');

let express;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if (dev) {
  express = require('./api'); // eslint-disable-line
} else {
  express = require('./server'); // eslint-disable-line
}

app.prepare()
  .then(() => {
    const server = express();

    server.use(exp.static(path.join(__dirname, './assets/css'), {
      redirect: false,
    }));

    server.get('/s/:storeName/:productName', async (req, res) => {
      const { productName, storeName } = req.params;

      let queryParams = {};

      try {
        const pkgName = `sweetieverse-s-${storeName}`;
        const pkgData = await packageJson(pkgName, {
          fullMetadata: true,
        });
        const response = await axios.get('https://unpkg.com/@sweetiebird/subverse@0.0.3/items/sweettooth');
        queryParams = {
          ...pkgData.sweetieverse,
          product: response.data,
          slug: `/s/${storeName}`,
        };
      } catch (e) {
        console.log(e); // todo: log this to loggly, etc
      }

      return app.render(req, res, '/product', queryParams);
    });

    server.get('/s/:storeName', async (req, res) => {
      const { storeName } = req.params;

      let pkgData = {};

      try {
        const pkgName = `sweetieverse-s-${storeName}`;
        pkgData = await packageJson(pkgName, {
          fullMetadata: true,
        });
      } catch (e) {
        console.log(e); // todo: log this to loggly, etc
      }

      const queryParams = pkgData.sweetieverse ? {
        ...pkgData.sweetieverse,
        slug: `/s/${storeName}`,
      } : {};

      return app.render(req, res, '/', queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
