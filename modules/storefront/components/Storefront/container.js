import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../../selectors';
import { requestProducts } from '../../actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  products: selectors.getProducts,
  isFetching: selectors.getIsFetching,
});

const mapDispatchToProps = {
  requestProducts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
