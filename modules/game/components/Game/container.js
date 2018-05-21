import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getGamepads, getGamepadButtons } from '../../selectors';
import { updateGamepads } from '../../actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  gamepads: getGamepads,
  gamepadButtons: getGamepadButtons,
});

const mapDispatchToProps = {
  updateGamepads,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
