import React from 'react';

import { Layout } from '../modules/layout/components';
import { MyProfile } from '../modules/user/components';

import { ConfigProvider } from '../modules/context';

export default class User extends React.Component {
  static getInitialProps(context) {
    const json = JSON.parse(JSON.stringify(context.query));
    return json;
  }

  render() {
    return (
      <ConfigProvider value={this.props}>
        <Layout>
          <MyProfile />
        </Layout>
      </ConfigProvider>
    );
  }
}
