import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getGamepads, getButtonPressed } from '../../selectors';
import { updateGamepads } from '../../actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  gamepads: getGamepads,
  buttonPressed: getButtonPressed,
});

const mapDispatchToProps = {
  updateGamepads,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
