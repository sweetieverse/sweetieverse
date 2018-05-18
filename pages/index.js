import React from 'react';
import axios from 'axios';

import { Layout } from '../modules/layout/components';
import { Storefront } from '../modules/storefront/components';

import { ConfigProvider } from '../modules/context';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  static getInitialProps(context) {
    return context.query;
  }

  render() {
    const { identifier } = this.state;
    return (
      <ConfigProvider value={{ ...this.props }}>
        <Layout>
          {identifier}
        </Layout>
      </ConfigProvider>
    );
  }
}
