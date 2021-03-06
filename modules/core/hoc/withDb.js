import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setUser, updateUserGamepads, updateGameObject } from '../../game/actions';
import { getUserId } from '../../game/selectors';

const mapStateToProps = createStructuredSelector({
  userId: getUserId,
});

const mapDispatchToProps = {
  setUser,
  updateUserGamepads,
  updateGameObject,
};

const fb = global.window ? window.firebase : null;

function withDb(Component) {
  class ComponentWithDb extends React.Component {
    constructor(props) {
      super(props);
      this.db = fb ? fb.database() : null;
    }

    setUser(id, data) {
      this.props.setUser(id, data);
    }

    updateUserGamepads(gamepads) {
      const { userId } = this.props;
      // console.log('writing to firebase for id/gamepads: ', userId, gamepads);
      if (userId) this.props.updateUserGamepads(userId, gamepads);
      else console.log('no user id passed');
    }

    updateGameObject(object, data) {
      this.props.updateGameObject(object, data);
    }

    render() {
      return (
        <Component
          updateDbObject={this.updateGameObject.bind(this)}
          updateDbGamepads={this.updateUserGamepads.bind(this)}
          setUser={this.setUser.bind(this)}
          {...this.props} />
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ComponentWithDb);
}

export default withDb;
