import React from 'react';
import Slider from 'react-slick';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

import { Image, Video } from './components';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class Carousel extends React.Component {
  render() {
    const { images, videos } = this.props;

    return (
      <div className={styles.carousel}>
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <Image key={`product-img-${idx}`} src={img} alt="Product image" />
          ))}
          {videos.map((vid, idx) => (
            <Video key={`product-vid-${idx}`} src={vid} />
          ))}
        </Slider>
      </div>
    );
  }
}

Carousel.propTypes = propTypes;

Carousel.defaultProps = defaultProps;

export default Carousel;
