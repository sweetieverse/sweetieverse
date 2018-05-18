import axios from 'axios';

export async function requestProducts() {
  const path = '/api/products';

  return axios.get(path);
}
