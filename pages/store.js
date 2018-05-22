import React from 'react';
import axios from 'axios';

import { Layout } from '../modules/layout/components';
import { Storefront } from '../modules/storefront/components';

import { ConfigProvider } from '../modules/context';

export default class Store extends React.Component {
  static getInitialProps(context) {
    const json = JSON.parse(JSON.stringify(context.query));
    console.log(json);
    return json;
  }

  render() {
    const { xmlDoc, name, products } = this.props;

    return (
      <ConfigProvider value={this.props}>
        <Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}
