import * as constants from './constants';

export function updateTablePose(tableId, posX, rotX) {
  return {
    type: constants.UPDATE_TABLE_POSE,
    payload: {
      tableId,
      posX,
      rotX,
    },
  };
}

export function req(tableId, posX, rotX) {
  return {
    type: constants.UPDATE_TABLE_POSE,
    payload: {
      tableId,
      posX,
      rotX,
    },
  };
}

export function requestPlayerBet(playerId, amount, balls, ballIds) {
  return {
    type: constants.REQUEST_PLAYER_BET,
    payload: {
      playerId,
      amount,
      balls,
      ballIds,
    },
  };
}

export function requestBuyRound(playerId, giftId, receiverIds) {
  return {
    type: constants.REQUEST_PLAYER_BET,
    payload: {
      playerId,
      giftId,
      receiverIds,
    },
  };
}