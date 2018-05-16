import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getMenuOpen } from '../../selectors';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  open: getMenuOpen,
});

export default connect(
  mapStateToProps,
)(presenter);
