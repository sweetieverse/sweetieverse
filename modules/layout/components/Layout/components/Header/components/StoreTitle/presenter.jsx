import React from 'react';
import Link from 'next/link';

import styles from './styles.css';

const StoreTitle = (props) => {
  const { children } = props;

  return (
    <h1 className={styles.title}>
      <Link href={children.props.props.href}>
        <a>{children.props.children}</a>
      </Link>
    </h1>
  );
};

export default StoreTitle;
