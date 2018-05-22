import * as constants from './constants';

export const name = 'user';

const initialState = {
  user: {},
  isAuthenticated: false,
  isFetching: true,
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
        isFetching: false,
        isAuthenticated: true,
      };

    case constants.FIREBASE_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case constants.USER_DATA_RETRIEVED:
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
}
