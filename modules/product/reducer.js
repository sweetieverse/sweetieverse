import * as constants from './constants';

export const name = 'product';

const initialState = {
  product: {},
  isFetching: false,
  error: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case constants.PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        product: action.payload.product,
        error: null,
      };

    case constants.PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
}
