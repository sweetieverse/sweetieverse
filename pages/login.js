import * as React from 'react';

import { Layout } from '../modules/layout/components';
import { UserAuth } from '../modules/user/components';
import withAuthHook from '../modules/core/hoc/withAuthHook';

const UserAuthWithHook = withAuthHook(UserAuth);

class User extends React.Component {
  render() {
    return (
      <Layout>
        <UserAuthWithHook />
      </Layout>
    );
  }
}

export default User;
