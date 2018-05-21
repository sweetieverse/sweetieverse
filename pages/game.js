import React from 'react';

import { withDb } from '../modules/core/hoc';

import { Layout } from '../modules/layout/components';
import { Game } from '../modules/game/components';

const GameWithDb = withDb(Game);

export default class GamePage extends React.Component {
  static getInitialProps(context) {
    return context.query;
  }

  render() {
    return (
      <Layout>
        <GameWithDb />
      </Layout>
    );
  }
}
