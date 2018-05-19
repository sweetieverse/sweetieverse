import * as constants from './constants';

export const name = 'user';

const initialState = {
  user: {},
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
        user: action.payload.sessionData,
      };

    case constants.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
}
