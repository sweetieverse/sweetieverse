import React from 'react';

import propTypes from './prop-types';
import defaultProps from './default-props';
import styles from './styles.css';

class PaypalButton extends React.Component {
  componentDidMount() {
    const { amount, id, onSuccess } = this.props;
    const paypal = window.paypal;

    if (paypal) {
      paypal.Button.render({
        env: process.env.PP_ENV,
        client: {
          sandbox: process.env.PP_CLIENT_SANDBOX,
          production: process.env.PP_CLIENT_LIVE,
        },
        commit: true, // Show a 'Pay Now' button
        style: {
          color: 'gold',
          size: 'small',
          label: 'paypal'
        },
        payment: function(data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: `${amount}`, currency: 'USD' }
                }
              ]
            }
          });
        },
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            onSuccess(payment);
          });
        },
        onCancel: function(data, actions) {
          /*
           * Buyer cancelled the payment
           */
        },
        onError: function(err) {
          console.log(err);
        }
      }, `#${id}`);
    }
  }

  render() {
    const { id } = this.props;

    return (
      <div id={id} />
    );
  }
}

PaypalButton.propTypes = propTypes;

PaypalButton.defaultProps = defaultProps;

export default PaypalButton;
