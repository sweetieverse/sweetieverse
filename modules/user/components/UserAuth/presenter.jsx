import React from 'react';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.saveProfileImage = this.saveProfileImage.bind(this);
  }

  saveProfileImage() {
    const { user } = this.state;
  }

  handleUIFlow(el) {
    const { triggerUIFlow } = this.props;
    if (triggerUIFlow) triggerUIFlow();
  }

  render() {
    return (
      <div className={styles.profile}>
        <h4 className={styles.authHeader}>Sweetiestore Login</h4>
        <div ref={this.handleUIFlow.bind(this)} id="firebaseui-container" />
      </div>
    );
  }
}

UserAuth.propTypes = propTypes;

UserAuth.defaultProps = defaultProps;

export default UserAuth;
