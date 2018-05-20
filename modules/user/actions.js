import * as constants from './constants';

export function requestLogin(username, password) {
  return {
    type: constants.LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
  };
}

export function loginSuccess(sessionData) {
  return {
    type: constants.LOGIN_SUCCESS,
    payload: {
      sessionData,
    },
  };
}

export function loginFailure(message) {
  return {
    type: constants.LOGIN_FAILURE,
    payload: {
      message,
    },
  };
}

export function requestFirebaseLogin(username, password) {
  return {
    type: constants.FIREBASE_LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
  };
}

export function FirebaseLoginSuccess(userData) {
  return {
    type: constants.FIREBASE_LOGIN_SUCCESS,
    payload: {
      userData,
    },
  };
}

export function FirebaseLoginFailure(message) {
  return {
    type: constants.FIREBASE_LOGIN_FAILURE,
    payload: {
      message,
    },
  };
}
