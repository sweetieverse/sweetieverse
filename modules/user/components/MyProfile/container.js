import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../../selectors';
import { requestLogin } from '../../actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  isFetching: selectors.getIsFetching,
});

const mapDispatchToProps = {
  requestLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
