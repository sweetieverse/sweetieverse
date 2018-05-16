import React from 'react';
import Link from 'next/link';

import MenuOptions from '../../../../md/menu.md';
import StoreTitle from '../../../../md/store_title.md';

import { MenuItem, MenuTitle } from './components';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

class Menu extends React.Component {
  render() {
    const { open, toggleMenu } = this.props;

    const className = open ? `${styles.menu} ${styles.open}` : styles.menu;
    const underlayClasses = open ? `${styles.underlay} ${styles.open}` : styles.underlay;

    return (
      <React.Fragment>
        <div className={underlayClasses} onClick={toggleMenu} />

        <div className={className}>
          <StoreTitle components={{ p: MenuTitle }} />

          <MenuOptions components={{ a: MenuItem }} />
        </div>
      </React.Fragment>
    );
  }
}

Menu.propTypes = propTypes;

Menu.defaultProps = defaultProps;

export default Menu;
