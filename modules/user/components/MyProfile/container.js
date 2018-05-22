import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../../selectors';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  isFetching: selectors.getIsFetching,
  user: selectors.getUser,
});

export default connect(
  mapStateToProps,
)(presenter);
