import { call, fork, put, take, all } from 'redux-saga/effects';

import * as actions from './actions';
import * as api from './api';
import * as constants from './constants';

import { setUser } from '../game/actions';

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
  const saveData = {
    ...userData,
    displayName: userData.displayName || userData.email,
  };

  try {
    yield call(api.saveNewUser, saveData);
    const result = yield call(api.getUserData, userData.uid);
    if (result && result.val) {
      const user = result.val();
      yield all([
        put(actions.userDataRetrieved(user)),
        put(setUser(user.uid, user)),
      ]);
    } else {
      yield null;
    }
  } catch (error) {
    console.log(error, error.message);
    yield null;
  }
}

/**
 *  requestQueryStringLogin
 *  @param email {object}
 *  @param password {boolean}
 */
function* requestQueryStringLogin(email, password) {
  try {
    yield call(api.loginWithEmailAndPassword, email, password);
  } catch (error) {
    try {
      yield call(api.signupWithEmailAndPassword, email, password);
    } catch (e) {
      yield put(actions.queryStringLoginFailure());
    }
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
      constants.REQUEST_QUERY_STRING_LOGIN,
    ]);

    switch (type) {
      case constants.LOGIN_REQUEST:
        yield fork(requestLogin, payload.username, payload.password);
        break;

      case constants.FIREBASE_LOGIN_SUCCESS:
        yield fork(loginSuccess, payload.userData, payload.isNewUser);
        break;

      case constants.REQUEST_QUERY_STRING_LOGIN:
        yield fork(requestQueryStringLogin, payload.email, payload.password);
        break;

      default:
        yield null;
    }
  }
}

export default function* rootSaga() {
  yield watch();
}
