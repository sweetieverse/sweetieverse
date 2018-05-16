import React from 'react';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <button className={styles.menuButton} />
        <h1>sweetiebird</h1>
      </div>
    );
  }
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
