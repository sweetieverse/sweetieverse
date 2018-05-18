import * as constants from './constants';

export function requestProducts(productId) {
  return {
    type: constants.PRODUCTS_REQUEST,
    payload: {
      productId,
    },
  };
}

export function productsSuccess(product) {
  return {
    type: constants.PRODUCTS_SUCCESS,
    payload: {
      product,
    },
  };
}

export function productsFailure(message) {
  return {
    type: constants.PRODUCTS_FAILURE,
    payload: {
      message,
    },
  };
}
