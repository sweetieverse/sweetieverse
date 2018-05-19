import * as React from 'react';

function withDb(Component) {
  return class ComponentWithDb extends React.Component {
    render() {
      return (
        <Component />
      );
    }
  };
}
