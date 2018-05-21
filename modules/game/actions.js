import * as constants from './constants';

export function updateGamepads(gamepads, buttonPressed) {
  return {
    type: constants.UPDATE_GAMEPADS,
    payload: {
      gamepads,
      buttonPressed,
    },
  };
}
