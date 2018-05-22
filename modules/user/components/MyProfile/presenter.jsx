import React from 'react';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

import { UploadImage } from './components';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.saveProfileImage = this.saveProfileImage.bind(this);
  }

  saveProfileImage() {
    const { user } = this.state;
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.profile}>
        <p className={styles.greeting}>
          Welcome back, {user ? user.displayName : 'sign in'}!
        </p>
        <div>
          <label className={styles.label}>Email Address</label>
          <p className={styles.value}>{user ? user.email : ''}</p>
        </div>
      </div>
    );
  }
}

MyProfile.propTypes = propTypes;

MyProfile.defaultProps = defaultProps;

export default MyProfile;
