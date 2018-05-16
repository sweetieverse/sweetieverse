import React from 'react';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

import { PaypalButton } from './components';

class Offering extends React.Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  bindCallbacks() {
    this.onPaymentSuccess = this.onPaymentSuccess.bind(this);
  }

  onPaymentSuccess(payment) {
    const { onPayment, guid } = this.props;
    onPayment(guid, payment);
  }

  render() {
    const { price, title, offeringIndex } = this.props;
    const paypalAmount = price.split(' USD')[0].split('$')[1];
    const paypalId = `paypal-button-${offeringIndex}`;

    return (
      <React.Fragment>
        <div className={styles.offering}>
          <p>{title}</p>
          <p>{price}</p>
          <PaypalButton
            onSuccess={this.onPaymentSuccess}
            id={paypalId}
            amount={paypalAmount} />
        </div>
        <hr className={styles.rule} />
      </React.Fragment>
    );
  }
}

Offering.propTypes = propTypes;

Offering.defaultProps = defaultProps;

export default Offering;
