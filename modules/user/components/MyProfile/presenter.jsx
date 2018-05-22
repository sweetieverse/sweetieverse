import React from 'react';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

import { UploadImage } from './components';

class MyProfile extends React.Component {
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

  render() {
    return (
      <div className={styles.profile}>
        Welcome back!
        <UploadImage />
      </div>
    );
  }
}

MyProfile.propTypes = propTypes;

MyProfile.defaultProps = defaultProps;

export default MyProfile;
