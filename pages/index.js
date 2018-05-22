import React from 'react';
import axios from 'axios';

import { Layout } from '../modules/layout/components';
import { Storefront } from '../modules/storefront/components';

import { ConfigProvider } from '../modules/context';

export default class Index extends React.Component {
  static getInitialProps(context) {
    return context.query;
  }

  render() {
    return (
      <ConfigProvider value={{ ...this.props }}>
        <Layout authenticatedLayout={false}>
        </Layout>
      </ConfigProvider>
    );
  }
}
