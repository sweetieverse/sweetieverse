import * as constants from './constants';

// export function setUser() {
//
// }

export function updateGamepads(gamepads, buttonPressed) {
  return {
    type: constants.UPDATE_GAMEPADS,
    payload: {
      gamepads,
      buttonPressed,
    },
  };
}

export function addPlayer(playerMap, playerId) {
  return {
    type: constants.ADD_PLAYER,
    payload: {
      playerMap,
      playerId,
    },
  };
}

export function fbReceivedPlayers(playerMap, playerId) {
  return {
    type: constants.FB_RECEIVED_PLAYERS,
    payload: {
      playerMap,
      playerId,
    },
  };
}
