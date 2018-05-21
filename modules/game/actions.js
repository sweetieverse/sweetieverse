import * as constants from './constants';

export function updateGamepads(gamepads, buttons) {
  return {
    type: constants.UPDATE_GAMEPADS,
    payload: {
      gamepads,
      buttons,
    },
  };
}
