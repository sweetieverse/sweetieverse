import React from 'react';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

import { MenuIcon } from '../../../../../icons';
import { StoreTitle } from './components';

class Header extends React.Component {
  render() {
    const { toggleMenu, storeName, slug } = this.props;

    return (
      <div className={styles.header}>
        <button
          onClick={toggleMenu}
          className={styles.menuButton}>
          <MenuIcon />
        </button>

        <StoreTitle storeName={storeName} slug={slug} />
      </div>
    );
  }
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
