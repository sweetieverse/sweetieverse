import * as React from 'react';

const fb = global.window ? window.firebase : null;

function withDb(Component) {
  return class ComponentWithDb extends React.Component {
    constructor(props) {
      super(props);
      this.db = fb ? fb.database() : null;
    }

    render() {
      return (
        <Component />
      );
    }
  };
}
