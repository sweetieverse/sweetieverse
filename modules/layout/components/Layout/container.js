import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getMenuOpen } from '../../../nav/selectors';
import { toggleMenu } from '../../../nav/actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  menuOpen: getMenuOpen,
});

const mapDispatchToProps = {
  toggleMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
