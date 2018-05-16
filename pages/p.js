import React from 'react';

import { Layout } from '../modules/layout/components';
import { ProductPage } from '../modules/product/components';

const P = (props) => {
  const { url } = props;
  console.log(Object.keys(props));
  return (
    <Layout>
      product page
    </Layout>
  );
};

export default P;
