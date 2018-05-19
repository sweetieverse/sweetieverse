const next = require('next');
const packageJson = require('package-json');
const axios = require('axios');

const { XmlService } = require('./api/services');

// next.js boilerplate code
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  AddonParamRoute,
  ProductParamRoute,
  StoreParamRoute,
  HomeRoute,
} = require('./serverConstants');

// init function for an instance of express
let api;
if (dev) api = require('./api'); // eslint-disable-line
else api = require('./server/index'); // eslint-disable-line

app.prepare()
  .then(() => {
    // init express api
    const server = api();

    server.get(AddonParamRoute.REQ_PATH, async (req, res) => {
      const { productName, storeName, addon } = req.params;

      const reqPath = `/s/${storeName}/${productName}/${addon}`;
      const pkgName = `${storeName}-${productName}-${addon}`;

      let queryParams = {};
      try {
        const pkgData = await packageJson(pkgName, {
          fullMetadata: true,
        });
        queryParams = {
          ...pkgData.sweetieverse,
          identifier: pkgData.name,
          slug: reqPath,
        };
      } catch (e) {
        console.log(e); // todo: log this to loggly, etc
      }

      return app.render(req, res, AddonParamRoute.RES_PATH, queryParams);
    });

    server.get(ProductParamRoute.REQ_PATH, async (req, res) => {
      const { productName, storeName } = req.params;
      const reqPath = `/s/${storeName}/${productName}`;
      const pkgName = `${storeName}-${productName}`;

      let queryParams = {};
      try {
        const pkgData = await packageJson(pkgName, {
          fullMetadata: true,
        });
        queryParams = {
          ...pkgData.sweetieverse,
          identifier: pkgData.name,
          slug: reqPath,
        };
      } catch (e) {
        console.log(e); // todo: log this to loggly, etc
      }

      return app.render(req, res, ProductParamRoute.RES_PATH, queryParams);
    });

    server.get(StoreParamRoute.REQ_PATH, async (req, res) => {
      const { storeName } = req.params;

      const actualPath = `/s/${storeName}`;

      let pkgData = {};
      let xmlDoc = '';
      let products = [];

      try {
        pkgData = await packageJson(storeName, {
          fullMetadata: true,
        });
        const xmlUrl = pkgData.sweetieverse ? pkgData.sweetieverse.model : '';
        xmlDoc = await XmlService.fetchStoreXml(xmlUrl);
        products = await XmlService.parseDocumentForProducts(xmlDoc);
        console.log(products);
      } catch (e) {
        console.log(e); // todo: log this to loggly, etc
      }

      const queryParams = pkgData.sweetieverse ? {
        xmlDoc,
        products,
        identifier: storeName,
        slug: actualPath,
      } : {};

      return app.render(req, res, StoreParamRoute.RES_PATH, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`The magic happens on http://localhost:${port}`);
    });
  });
