import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from './actions';
import * as constants from './constants';

/**
 *  Generator function to listen for redux actions
 *
 *  Handles any action api requests as non-blocking calls and
 *    returns the appropriate action responses
 */
function* watch() {
  while (true) {
    const { type, payload = {} } = yield take([]);

    switch (type) {
      default:
        yield null;
    }
  }
}

export default function* rootSaga() {
  yield watch();
}
