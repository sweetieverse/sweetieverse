import axios from 'axios';

const fb = global.window ? window.firebase : null;

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

export async function saveNewUser(userData) {
  const path = `users/${userData.uid}`;
  const ref = fb.database().ref(path);
  return ref.set(userData);
}

export async function getUserData(uid) {
  const path = `users/${uid}`;
  const ref = fb.database().ref(path);
  return ref.once('value');
}
