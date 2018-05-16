import * as constants from './constants';

export function requestProduct(productId) {
  return {
    type: constants.PRODUCT_REQUEST,
    payload: {
      productId,
    },
  };
}

export function productSuccess(product) {
  return {
    type: constants.PRODUCT_SUCCESS,
    payload: {
      product,
    },
  };
}

export function productFailure(message) {
  return {
    type: constants.PRODUCT_FAILURE,
    payload: {
      message,
    },
  };
}

export function saveUserPayment(userId, payment, product, guid) {
  return {
    type: constants.SAVE_USER_PAYMENT_REQUEST,
    payload: {
      userId,
      payment,
      product,
      guid,
    },
  };
}

export function saveUserPaymentSuccess() {
  return {
    type: constants.SAVE_USER_PAYMENT_SUCCESS,
  };
}

export function saveUserPaymentFailure(message) {
  return {
    type: constants.SAVE_USER_PAYMENT_FAILURE,
    payload: {
      message,
    },
  };
}
