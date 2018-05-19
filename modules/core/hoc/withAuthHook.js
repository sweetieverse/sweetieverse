import * as React from 'react';

const fb = global.window ? window.firebase : null;
const firebaseui = global.window ? window.firebaseui : null;

function getWidgetUrl() {
  return '/widget';
}

/**
 * Redirects to the FirebaseUI widget.
 */
const signInWithRedirect = () => (
  global.window ? window.location.assign(getWidgetUrl()) : null
);

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
          signInOptions: [
            // TODO(developer): Remove the providers you don't need for your app.
            {
              provider: fb.auth.GoogleAuthProvider.PROVIDER_ID,
            },
            {
              provider: fb.auth.FacebookAuthProvider.PROVIDER_ID,
              scopes: [
                'public_profile',
                'email',
                'user_likes',
                'user_friends',
              ],
            },
            {
              provider: fb.auth.EmailAuthProvider.PROVIDER_ID,
              // Whether the display name should be displayed in Sign Up page.
              requireDisplayName: true,
            },
          ],
        };
      }

      // Initialize the FirebaseUI Widget using Firebase.
      this.ui = new firebaseui.auth.AuthUI(fb.auth());
      this.ui.start('#firebaseui-container', getUiConfig());
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
