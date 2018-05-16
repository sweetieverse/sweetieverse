import React from 'react';
import { withRouter } from 'next/router';

import { Layout } from '../modules/layout/components';
import { ProductPage } from '../modules/product/components';

const P = (props) => {
  const { router } = props;

  return (
    <Layout>
      {router.query.name}
    </Layout>
  );
};

export default withRouter(P);
