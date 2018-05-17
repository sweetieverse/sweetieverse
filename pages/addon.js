import React from 'react';

import { Layout } from '../modules/layout/components';

import { ConfigProvider } from '../modules/context';

export default class Addon extends React.Component {
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
