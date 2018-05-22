import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGamepads,
  getButtonPressed,
  getPlayerIds,
  getPlayers,
  getUserId,
  getUser,
  getCube,
} from '../../selectors';
import { updateGamepads } from '../../actions';

import presenter from './presenter';

const mapStateToProps = createStructuredSelector({
  gamepads: getGamepads,
  buttonPressed: getButtonPressed,
  players: getPlayers,
  playerIds: getPlayerIds,
  userId: getUserId,
  user: getUser,
  cube: getCube,
});

const mapDispatchToProps = {
  updateGamepads,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
