import axios from 'axios';

export async function requestLogin(username, password) {
  const path = 'https://registry.webmr.io/l';

  const data = {
    email: username,
    password,
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${this.state.auth.token}`,
    },
  };

  return axios.post(path, data, options);
}
