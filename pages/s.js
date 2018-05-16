import React from 'react';

import { Layout } from '../modules/layout/components';
import { Storefront } from '../modules/storefront/components';

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Storefront />
      </Layout>
    );
  }
}
