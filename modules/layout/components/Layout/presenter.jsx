import React from 'react';

import { Header } from './components';
import { Menu } from '../../../nav/components';

import styles from './styles.css';

import { ConfigConsumer } from '../../../context';

const fb = global.window ? window.firebase : null;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.unregisterAuthObserver = null;
  }

  componentDidMount() {
    if (fb) {
      this.unregisterAuthObserver = fb.auth().onAuthStateChanged((user) => {
        this.handleSignedInUser(user);
      });
    }
  }

  componentWillUnmount() {
    if (this.unregisterAuthObserver) this.unregisterAuthObserver();
  }

  handleSignedInUser(user) {
    const { firebaseLoginSuccess: loginSuccess } = this.props;
    const { uid, email, displayName } = user;
    loginSuccess({ uid, email, displayName });
  }

  render() {
    const {
      toggleMenu,
      menuOpen,
      children,
    } = this.props;

    return (
      <ConfigConsumer>
        {config => (
          <React.Fragment>
            <Header
              slug={config.slug || '/'}
              storeName={config.xmlDoc ? config.xmlDoc.attr.name : 'Sweetiestore'}
              toggleMenu={toggleMenu} />

            <Menu
              items={config.menu || []}
              slug={config.slug || '/'}
              storeName={config.xmlDoc ? config.xmlDoc.attr.name : 'Sweetiestore'}
              open={menuOpen}
              toggleMenu={toggleMenu} />

            <div className={styles.layout}>
              {children}
            </div>
          </React.Fragment>
        )}
      </ConfigConsumer>
    );
  }
}

export default Layout;
