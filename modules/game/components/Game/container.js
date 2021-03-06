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
import { getUser as getAuthUser } from '../../../user/selectors';
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
  authUser: getAuthUser,
});

const mapDispatchToProps = {
  updateGamepads,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(presenter);
