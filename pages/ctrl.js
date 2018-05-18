import React from 'react';

import { Layout } from '../modules/layout/components';

import { CanvasScene } from '../components';

class Ctrl extends React.Component {
  render() {
    return (
      <Layout>
        <CanvasScene />
      </Layout>
    );
  }
}

export default Ctrl;
