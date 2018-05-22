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

  handleGoogleFlow() {
    const { triggerGoogleFlow } = this.props;
    if (triggerGoogleFlow) triggerGoogleFlow();
  }

  handleFacebookFlow() {
    const { triggerFacebookFlow } = this.props;
    if (triggerFacebookFlow) triggerFacebookFlow();
  }

  handleUIFlow(el) {
    const { triggerUIFlow } = this.props;
    if (triggerUIFlow) triggerUIFlow();
  }

  render() {
    return (
      <div className={styles.profile}>
        <div ref={this.handleUIFlow.bind(this)} id="firebaseui-container" />
        {/* <button onClick={this.handleGoogleFlow.bind(this)}>Google Sign-In</button> */}
        {/* <button onClick={this.handleGoogleFlow.bind(this)}>Google Sign-In</button> */}
      </div>
    );
  }
}

UserAuth.propTypes = propTypes;

UserAuth.defaultProps = defaultProps;

export default UserAuth;
