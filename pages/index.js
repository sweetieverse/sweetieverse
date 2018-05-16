import React from 'react';
import axios from 'axios';

import { Layout } from '../modules/layout/components';
import { Storefront } from '../modules/storefront/components';

import { ConfigProvider } from '../modules/context';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  static getInitialProps(context) {
    return context.query;
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/menu.json');
      const { data: { items } } = response;

      this.setState({ menu: items });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { menu } = this.state;

    return (
      <ConfigProvider value={{ ...this.props, menu }}>
        <Layout>
          <Storefront />
        </Layout>
      </ConfigProvider>
    );
  }
}
