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
