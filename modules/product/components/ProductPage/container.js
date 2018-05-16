import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../../selectors';
import { requestProduct, saveUserPayment } from '../../actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  product: selectors.getProduct,
  isFetching: selectors.getIsFetching,
});

const mapDispatchToProps = {
  requestProduct,
  saveUserPayment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
