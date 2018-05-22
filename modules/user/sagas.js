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
 *  loginSuccess
 *  @param userData {object}
 *  @param isNewUser {boolean}
 */
function* loginSuccess(userData, isNewUser) {
  if (!isNewUser) yield null;

  try {
    yield call(api.saveNewUser, userData);
    const result = yield call(api.getUserData, userData.uid);
    if (result && result.val) {
      const user = result.val();
      yield put(actions.userDataRetrieved(user));
    } else {
      yield null;
    }
  } catch (error) {
    console.log(error, error.message);
    yield null;
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
      constants.FIREBASE_LOGIN_SUCCESS,
    ]);

    switch (type) {
      case constants.LOGIN_REQUEST:
        yield fork(requestLogin, payload.username, payload.password);
        break;

      case constants.FIREBASE_LOGIN_SUCCESS:
        yield fork(loginSuccess, payload.userData, payload.isNewUser);
        break;

      default:
        yield null;
    }
  }
}

export default function* rootSaga() {
  yield watch();
}
