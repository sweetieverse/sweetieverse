import React from 'react';
import initializeStore from '../store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default NextApp => class Redux extends React.Component {
  static async getInitialProps(appContext) {
    const newContext = {
      ...appContext,
    };

    const reduxStore = getOrCreateStore();

    // provide the store to getInitialProps of pages
    newContext.ctx.reduxStore = reduxStore;

    let appProps = {};
    if (NextApp.getInitialProps) {
      appProps = await NextApp.getInitialProps(newContext);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  }

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <NextApp {...this.props} reduxStore={this.reduxStore} />;
  }
};
