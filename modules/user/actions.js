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

export function requestFirebaseLogin() {
  return {
    type: constants.FIREBASE_LOGIN_REQUEST,
  };
}

export function requestQueryStringLogin(email, password) {
  return {
    type: constants.REQUEST_QUERY_STRING_LOGIN,
    payload: {
      email,
      password,
    },
  };
}

export function queryStringLoginFailure() {
  return {
    type: constants.QUERY_STRING_LOGIN_FAILURE,
  };
}

export function firebaseLoginSuccess(userData, isNewUser) {
  return {
    type: constants.FIREBASE_LOGIN_SUCCESS,
    payload: {
      userData,
      isNewUser,
    },
  };
}

export function firebaseLoginFailure(message) {
  return {
    type: constants.FIREBASE_LOGIN_FAILURE,
    payload: {
      message,
    },
  };
}

export function userDataRetrieved(user) {
  return {
    type: constants.USER_DATA_RETRIEVED,
    payload: {
      user,
    },
  };
}
