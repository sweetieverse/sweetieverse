import React from 'react';

import styles from './styles.css';

const StoreTitle = (props) => {
  const { storeName, slug } = props;

  return (
    <h1 className={styles.title}>
      <a href={slug}>{slug}</a>
    </h1>
  );
};

export default StoreTitle;
