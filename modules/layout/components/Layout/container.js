import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getMenuOpen } from '../../../nav/selectors';
import { toggleMenu } from '../../../nav/actions';
import {
  firebaseLoginSuccess,
  firebaseLoginFailure,
  requestQueryStringLogin,
} from '../../../user/actions';
import { getIsAuthenticated, getIsFetching } from '../../../user/selectors';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  menuOpen: getMenuOpen,
  isAuthenticated: getIsAuthenticated,
  isFetching: getIsFetching,
});

const mapDispatchToProps = {
  toggleMenu,
  firebaseLoginSuccess,
  firebaseLoginFailure,
  requestQueryStringLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
