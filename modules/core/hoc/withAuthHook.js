import * as React from 'react';
import { connect } from 'react-redux';

import { firebaseLoginSuccess, requestFirebaseLogin } from '../../user/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  firebaseLoginSuccess,
  requestFirebaseLogin,
};

const fb = global.window ? window.firebase : null;
const firebaseui = global.window ? window.firebaseui : null;

function withAuthHook(Component) {
  if (!fb || !firebaseui) return Component;

  class ComponentWithAuthHook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        user: {},
      };
      this.ui = null;
      this.triggerUIFlow = this.triggerUIFlow.bind(this);
      this.getUiConfig = this.getUiConfig.bind(this);
    }

    componentDidMount() {
      if (!this.ui) {
        this.ui = new firebaseui.auth.AuthUI(fb.auth());
        if (this.ui.isPendingRedirect()) {
          this.ui.start('#firebaseui-container', this.getUiConfig());
        }
      }
    }

    getUiConfig() {
      const me = this;
      return {
        callbacks: {
          // Called when the user has been successfully signed in.
          signInSuccessWithAuthResult(authResult, redirectUrl) {
            if (authResult.user) {
              const { isNewUser } = authResult.additionalUserInfo;
              me.handleSignedInUser(authResult.user, isNewUser);
            }
            return true;
          },
        },
        // Opens IDP Providers sign-in flow in a popup.
        signInFlow: 'popup',
        // signInSuccessUrl: '/',
        signInOptions: [
          {
            provider: fb.auth.GoogleAuthProvider.PROVIDER_ID,
          },
          {
            provider: fb.auth.GithubAuthProvider.PROVIDER_ID,
          },
          {
            provider: fb.auth.FacebookAuthProvider.PROVIDER_ID,
          },
        ],
      };
    }

    handleSignedInUser(user) {
      const { firebaseLoginSuccess: loginSuccess } = this.props;
      const { uid, email, displayName } = user;
      loginSuccess({ uid, email, displayName });
    }

    triggerUIFlow() {
      // Initialize the FirebaseUI Widget using Firebase.
      if (!this.ui) {
        this.ui = new firebaseui.auth.AuthUI(fb.auth());
        this.ui.start('#firebaseui-container', this.getUiConfig());
      }
    }

    render() {
      return (
        <Component
          triggerUIFlow={this.triggerUIFlow}
          token={this.state.token}
          user={this.state.user}
          { ...this.props } />
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ComponentWithAuthHook);
}

export default withAuthHook;
