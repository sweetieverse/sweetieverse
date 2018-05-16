import React from 'react';
import Link from 'next/link';

import styles from './styles.css';

const MenuItem = props => (
  <span className={styles.item}>
    <Link href={props.link}>
      <a>{props.text}</a>
    </Link>
  </span>
);

export default MenuItem;
