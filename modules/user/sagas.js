import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from './actions';
import * as api from './api';
import * as constants from './constants';

/**
 *  requestLogin
 *  @param username {string}
 *  @param password {string}
 */
function* requestLogin(username, password) {
  try {
    const response = yield call(api.requestLogin, username, password);

    if (response.error) {
      yield put(actions.loginFailure(response.error.message));
    } else {
      const { id, email, token } = response.data;
      yield put(actions.loginSuccess({ id, email, token }));
    }
  } catch (error) {
    yield put(actions.loginFailure(error.message));
  }
}

/**
 *  Generator function to listen for redux actions
 *
 *  Handles any action api requests as non-blocking calls and
 *    returns the appropriate action responses
 */
function* watch() {
  while (true) {
    const { type, payload = {} } = yield take([
      constants.LOGIN_REQUEST,
    ]);

    switch (type) {
      case constants.LOGIN_REQUEST:
        yield fork(requestLogin, payload.username, payload.password);
        break;

      default:
        yield null;
    }
  }
}

export default function* rootSaga() {
  yield watch();
}
