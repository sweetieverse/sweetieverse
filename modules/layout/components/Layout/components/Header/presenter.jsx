import React from 'react';

import Title from '../../../../../../md/store_title.md';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

import { MenuIcon } from '../../../../../icons';
import { StoreTitle } from './components';

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

        <Title components={{ p: StoreTitle }} />
      </div>
    );
  }
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
