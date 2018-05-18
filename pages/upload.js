import React from 'react';
import axios from 'axios';

// email
//   :
//   "random@gmail.com"
// id
//   :
//   "HW2UeDed+JnfpzqaqEqvyg=="
// token
//   :
//   "7DtVxkfzPEK275F468VPNtAfwm6hNCkxBKOzYs0zVWc="

import { Layout } from '../modules/layout/components';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readerResult: null,
      mimeType: '',
      uploadFile: null,
      email: '',
      password: '',
      auth: { email: '', id: '', token: '' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.login = this.login.bind(this);
  }

  uploadFile(evt) {
    const me = this;
    const reader = new FileReader();
    const upload = evt.target.files[0];
    const { type } = evt.target.files[0];
    reader.addEventListener('load', (event) => {
      me.setState({
        readerResult: reader.result,
        mimeType: type,
        uploadFile: upload,
      });
    }, false);
    if (upload) {
      reader.readAsDataURL(upload);
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  }

  async login() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.post('https://registry.webmr.io/l', {
      email: this.state.email,
      password: this.state.password,
    }, options);
    const { data: { id, email, token } } = response;
    this.setState({
      auth: {
        id,
        email,
        token,
      },
    });
  }

  render() {
    return (
      <Layout>
        <input value={this.state.email} onChange={this.handleChange} name="email" />
        <input value={this.state.password} onChange={this.handleChange} name="password" />
        <button onClick={this.login}>Login to Webmr</button>
        <img src={this.state.readerResult} />
        <form method="post" encType="multipart/form-data">
          <div>
            <label htmlFor="file">Choose file to upload</label>
            <input type="file" id="file" name="file" multiple onChange={this.uploadFile} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </Layout>
    );
  }
}
