import React from 'react';
import Link from 'next/link';

import { Header } from './components';
import { Menu } from '../../../nav/components';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

import { ConfigConsumer } from '../../../context';

const fb = global.window ? window.firebase : null;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.unregisterAuthObserver = null;
    this.handleSignedInUser = this.handleSignedInUser.bind(this);
    this.handleNoSignedInUser = this.handleNoSignedInUser.bind(this);
  }

  componentDidMount() {
    if (fb) {
      this.unregisterAuthObserver = fb.auth().onAuthStateChanged((user) => {
        if (user) this.handleSignedInUser(user);
        else this.handleNoSignedInUser();
      });
    }
  }

  componentWillUnmount() {
    if (this.unregisterAuthObserver) this.unregisterAuthObserver();
  }

  handleSignedInUser(user) {
    const { firebaseLoginSuccess } = this.props;
    const { uid, email, displayName } = user;
    firebaseLoginSuccess({ uid, email, displayName });
  }

  handleNoSignedInUser() {
    const { firebaseLoginFailure } = this.props;
    firebaseLoginFailure();
  }

  render() {
    const {
      toggleMenu,
      menuOpen,
      children,
      isAuthenticated,
      isFetching,
      authenticatedLayout,
    } = this.props;

    console.log(authenticatedLayout);
    let renderChildren = children;

    if (authenticatedLayout) {
      if (!isAuthenticated) {
        if (isFetching) {
          renderChildren = <div />;
        } else {
          renderChildren = (
            <Link href="/login">
              <a>Login</a>
            </Link>
          );
        }
      }
    }

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
              {renderChildren}
            </div>
          </React.Fragment>
        )}
      </ConfigConsumer>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
