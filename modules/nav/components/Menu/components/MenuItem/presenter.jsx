import React from 'react';
import Link from 'next/link';

import styles from './styles.css';

const MenuItem = props => (
  <span className={styles.item}>
    <Link {...props}>
      <a { ...props } />
    </Link>
  </span>
);

export default MenuItem;
