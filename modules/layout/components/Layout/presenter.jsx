import React from 'react';

import { Header } from './components';
import { Menu } from '../../../nav/components';

import styles from './styles.css';

const Layout = props => (
  <React.Fragment>
    <Header toggleMenu={props.toggleMenu} />

    <Menu open={props.menuOpen} toggleMenu={props.toggleMenu} />

    <div className={styles.layout}>
      {props.children}
    </div>
  </React.Fragment>
);

export default Layout;
