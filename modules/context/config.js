import React from 'react';

const { Provider: ConfigProvider, Consumer: ConfigConsumer } = React.createContext({
  storeName: '',
  description: '',
  slug: '',
});

export { ConfigConsumer, ConfigProvider };
