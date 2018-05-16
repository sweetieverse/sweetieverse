import React from 'react';

import { MenuItem, MenuTitle } from './components';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

class Menu extends React.Component {
  render() {
    const { open, toggleMenu, slug, storeName, items } = this.props;

    const className = open ? `${styles.menu} ${styles.open}` : styles.menu;
    const underlayClasses = open ? `${styles.underlay} ${styles.open}` : styles.underlay;

    return (
      <React.Fragment>
        <div className={underlayClasses} onClick={toggleMenu} />

        <div className={className}>
          <MenuTitle slug={slug} storeName={storeName} />

          {items.map((item, idx) => (
            <MenuItem key={`store-menu-item-${idx}`} text={item.text} link={item.link} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

Menu.propTypes = propTypes;

Menu.defaultProps = defaultProps;

export default Menu;
