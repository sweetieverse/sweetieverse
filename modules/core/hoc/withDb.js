import * as React from 'react';

const fb = global.window ? window.firebase : null;

function withDb(Component) {
  return class ComponentWithDb extends React.Component {
    constructor(props) {
      super(props);
      this.db = fb ? fb.database() : null;
    }

    joinGame(playerName, data) {
      if (this.db) {
        this.db.ref(`players/${playerName}`).update(data);
      }
    }

    render() {
      return (
        <Component
          joinGame={this.joinGame.bind(this)}
          {...this.props} />
      );
    }
  };
}

export default withDb;
