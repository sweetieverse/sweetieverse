import * as React from 'react';

const fb = global.window ? window.firebase : null;
const firebaseui = global.window ? window.firebaseui : null;

function withAuthHook(Component) {
  if (!fb || !firebaseui) return Component;

  const provider = new fb.auth.FacebookAuthProvider();
  const gProvider = new fb.auth.GoogleAuthProvider();

  return class ComponentWithAuthHook extends React.Component {
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
      this.setState({ user });
    }

    triggerUIFlow() {
      const me = this;
      function getUiConfig() {
        return {
          callbacks: {
            // Called when the user has been successfully signed in.
            signInSuccessWithAuthResult(authResult, redirectUrl) {
              if (authResult.user) {
                me.handleSignedInUser(authResult.user);
              }
              // Do not redirect.
              return false;
            },
          },
          // Opens IDP Providers sign-in flow in a popup.
          signInFlow: 'popup',
          signInSuccessUrl: '/user',
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

      // Initialize the FirebaseUI Widget using Firebase.
      if (!this.ui) {
        this.ui = new firebaseui.auth.AuthUI(fb.auth());
        this.ui.start('#firebaseui-container', getUiConfig());
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
  };
}

export default withAuthHook;
