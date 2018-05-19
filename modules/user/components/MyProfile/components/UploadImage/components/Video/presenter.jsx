import React from 'react';
import YouTube from 'react-youtube';
import qs from 'query-string';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

class Video extends React.Component {
  render() {
    const { src, autoplay } = this.props;
    const { v } = qs.parse(src.split('?')[1]);

    return (
      <div className={styles.video}>
        {
          src.length > 0 &&
            <YouTube videoId={v} opts={{ playerVars: { autoplay } }} />
        }
      </div>
    );
  }
}

Video.propTypes = propTypes;

Video.defaultProps = defaultProps;

export default Video;
