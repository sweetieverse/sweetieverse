import React from 'react';
import axios from 'axios';

import { Layout } from '../modules/layout/components';
import { ProductPage } from '../modules/product/components';

import { ConfigProvider } from '../modules/context';

export default class Product extends React.Component {
  static getInitialProps(context) {
    console.log(context);
    return context.query;
  }

  render() {
    const { identifier } = this.props;
    console.log(identifier);
    return (
      <ConfigProvider value={{ ...this.props }}>
        <Layout>
          {identifier}
        </Layout>
      </ConfigProvider>
    );
  }
}
