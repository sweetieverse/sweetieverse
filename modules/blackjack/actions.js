import * as constants from './constants';

export function updateTablePose(tableId, pose) {
  return {
    type: constants.UPDATE_TABLE_POSE,
    payload: {
      tableId,
      pose,
    },
  };
}

export function requestPlayerBet(playerId, amount) {
  return {
    type: constants.REQUEST_PLAYER_BET,
    payload: {
      playerId,
      amount,
    },
  };
}
