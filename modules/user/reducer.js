import * as constants from './constants';

export const name = 'user';

const initialState = {
  user: {},
  isAuthenticated: false,
  isFetching: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload.sessionData,
      };

    case constants.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
      };

    case constants.FIREBASE_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case constants.FIREBASE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.userData,
        isFetching: false,
      };

    case constants.FIREBASE_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
}
