import React from 'react';
import Link from 'next/link';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

class Storefront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  render() {
    const { items } = this.state;

    return (
      <div className={styles.storefront}>
        {items.map((item, idx) => (
          <Link href={item} key={`store-section-item-${idx}`}>
            <a>{item}</a>
          </Link>
        ))}
      </div>
    );
  }
}

Storefront.propTypes = propTypes;

Storefront.defaultProps = defaultProps;

export default Storefront;
