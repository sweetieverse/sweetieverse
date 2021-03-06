import * as constants from './constants';

export function setUser(id, data) {
  return {
    type: constants.SET_USER,
    payload: {
      id,
      data,
    },
  };
}

export function updateUserGamepads(id, gamepads) {
  // console.log(id, gamepads);
  return {
    type: constants.UPDATE_USER_GAMEPADS,
    payload: {
      id,
      gamepads,
    },
  };
}

export function updateGameObject(object, data) {
  return {
    type: constants.UPDATE_GAME_OBJECT,
    payload: {
      object,
      data,
    },
  };
}

export function updateGamepads(gamepads, buttonPressed) {
  return {
    type: constants.UPDATE_GAMEPADS,
    payload: {
      gamepads,
      buttonPressed,
    },
  };
}

export function fbReceivedObjectData(object, data) {
  return {
    type: constants.FB_RECEIVED_OBJECT_DATA,
    payload: {
      object,
      data,
    },
  };
}

export function updateObjectData(object, data) {
  return {
    type: constants.UPDATE_OBJECT_DATA,
    payload: {
      object,
      data,
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
