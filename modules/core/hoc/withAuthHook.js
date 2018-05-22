import * as React from 'react';
import { connect } from 'react-redux';

import { firebaseLoginSuccess } from '../../user/actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  firebaseLoginSuccess,
};

const fb = global.window ? window.firebase : null;
const firebaseui = global.window ? window.firebaseui : null;

function withAuthHook(Component) {
  if (!fb || !firebaseui) return Component;

  const provider = new fb.auth.FacebookAuthProvider();
  const gProvider = new fb.auth.GoogleAuthProvider();

  class ComponentWithAuthHook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        user: {},
      };
      this.ui = null;
      this.triggerUIFlow = this.triggerUIFlow.bind(this);
      this.triggerFacebookFlow = this.triggerFacebookFlow.bind(this);
      this.triggerGoogleFlow = this.triggerGoogleFlow.bind(this);
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
          signInSuccess(currentUser, credential, redirectUrl) {
            console.log(currentUser);
            if (currentUser) {
              me.handleSignedInUser(currentUser);
            }
            // Do not redirect.
            return false;
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
            provider: fb.auth.FacebookAuthProvider.PROVIDER_ID,
          },
          {
            provider: fb.auth.GithubAuthProvider.PROVIDER_ID,
          },
        ],
      };
    }

    triggerGoogleFlow() {
      try {
        fb.auth().signInWithPopup(gProvider).then((result) => {
          const token = result.credential.accessToken;
          const { user } = result;
          this.setState({ token, user });
        });
      } catch (e) {
        console.log(e);
      }
    }

    triggerFacebookFlow() {
      try {
        fb.auth().signInWithPopup(provider).then((result) => {
          const token = result.credential.accessToken;
          const { user } = result;
          this.setState({ token, user });
        });
      } catch (e) {
        console.log(e);
      }
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
          triggerGoogleFlow={this.triggerGoogleFlow}
          triggerFacebookFlow={this.triggerFacebookFlow}
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
