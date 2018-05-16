import * as constants from './constants';

export const name = 'storefront';

const initialState = {
  products: {},
  isFetching: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case constants.PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        products: action.payload.products,
        error: null,
      };

    case constants.PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
}
