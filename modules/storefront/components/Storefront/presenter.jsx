import React from 'react';
import Link from 'next/link';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

class Storefront extends React.Component {
  render() {
    return (
      <div className={styles.storefront}>
        <Link href={'p?name=shawwn-candy'}>
          <a>Link</a>
        </Link>
      </div>
    );
  }
}

Storefront.propTypes = propTypes;

Storefront.defaultProps = defaultProps;

export default Storefront;
