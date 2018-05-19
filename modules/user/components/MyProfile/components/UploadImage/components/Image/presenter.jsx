import React from 'react';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

class Image extends React.Component {
  render() {
    const { src, alt } = this.props;

    return (
      <div className={styles.image}>
        <img src={src} alt={alt} />
      </div>
    );
  }
}

Image.propTypes = propTypes;

Image.defaultProps = defaultProps;

export default Image;
