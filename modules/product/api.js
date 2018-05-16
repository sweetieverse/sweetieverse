import axios from 'axios';

export async function requestProduct(productId) {
  const path = `/api/products/${productId}`;

  return axios.get(path);
}

export async function saveUserPayment(userId, payment, product, guid) {
  const path = `/api/users/${userId}/purchases`;
  const data = {
    purchase: payment,
    product,
    guid,
  };

  return axios.post(path, data);
}
