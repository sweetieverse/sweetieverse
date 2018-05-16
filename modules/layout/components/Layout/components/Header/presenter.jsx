import React from 'react';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

import { MenuIcon } from '../../../../../icons';

class Header extends React.Component {
  render() {
    const { toggleMenu } = this.props;

    return (
      <div className={styles.header}>
        <button
          onClick={toggleMenu}
          className={styles.menuButton}>
          <MenuIcon />
        </button>
        <h1>sweetiebird</h1>
      </div>
    );
  }
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
