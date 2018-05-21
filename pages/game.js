import React from 'react';

import { Layout } from '../modules/layout/components';
import { Game } from '../modules/game/components';

export default class GamePage extends React.Component {
  static getInitialProps(context) {
    return context.query;
  }

  render() {
    return (
      <Layout>
        <Game />
      </Layout>
    );
  }
}
