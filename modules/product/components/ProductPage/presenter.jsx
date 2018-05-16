import React from 'react';
import qs from 'query-string';

import { propTypes, defaultProps } from './props';
import styles from './styles.css';

import { Offering, Carousel } from './components';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.saveUserPayment = this.saveUserPayment.bind(this);
  }

  saveUserPayment(guid, payment) {
    const { user } = this.state;
    const { saveUserPayment, product } = this.props;
    saveUserPayment(user, payment, product, guid);
  }

  componentDidMount() {
    const { requestProduct, match, location } = this.props;
    const { productId } = match.params;
    const { search } = location;
    const { u } = qs.parse(search);

    this.setState({
      user: u,
    }, () => {
      requestProduct(productId);
    });
  }

  render() {
    const { product } = this.props;
    return (
      <div className={styles.productPage}>
        <h2>{product.title}</h2>

        <div className={styles.carousel}>
          <Carousel videos={product.videos} images={product.screenshots} />
        </div>

        <div className={styles.description}>
          <h3 className={styles.heading}>About</h3>
          <p>{product.description}</p>
        </div>

        <div className={styles.offerings}>
          <h3 className={styles.heading}>Offerings</h3>
          {product.offerings !== undefined &&product.offerings.map((offering, idx) => (
            <Offering
              guid={offering.guid}
              onPayment={this.saveUserPayment}
              offeringIndex={idx}
              title={offering.title}
              price={offering.price}
              key={`offering-${idx}`} />
          ))}
        </div>
      </div>
    );
  }
}

ProductPage.propTypes = propTypes;

ProductPage.defaultProps = defaultProps;

export default ProductPage;
