import React from 'react';

import styles from './styles.css';

const MenuTitle = (props) => {
  const { slug, storeName } = props;

  return (
    <h1 className={styles.title}>
      <a href={slug}>{storeName}</a>
    </h1>
  );
};

export default MenuTitle;
