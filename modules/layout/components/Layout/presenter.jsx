import React from 'react';

import { Header } from './components';
import { Menu } from '../../../nav/components';

import styles from './styles.css';

import { ConfigConsumer } from '../../../context';

const Layout = props => (
  <ConfigConsumer>
    {config => (
      <React.Fragment>
        <Header
          slug={config.slug}
          storeName={config.xmlDoc.attr.name}
          toggleMenu={props.toggleMenu} />

        <Menu
          items={config.menu}
          slug={config.slug}
          storeName={config.xmlDoc.attr.name}
          open={props.menuOpen}
          toggleMenu={props.toggleMenu} />

        <div className={styles.layout}>
          {props.children}
        </div>
      </React.Fragment>
    )}
  </ConfigConsumer>
);

export default Layout;
