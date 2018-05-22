import * as React from 'react';

import { Layout } from '../modules/layout/components';
import { UserAuth } from '../modules/user/components';
import { withAuthHook } from '../modules/core/hoc';

const UserAuthWithHook = withAuthHook(UserAuth);

class User extends React.Component {
  render() {
    return (
      <Layout authenticatedLayout={false}>
        <UserAuthWithHook />
      </Layout>
    );
  }
}

export default User;
