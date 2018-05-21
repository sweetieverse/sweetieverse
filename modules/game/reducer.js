import * as constants from './constants';

export const name = 'game';

const initialState = {
  gamepads: [],
  gamepadButtons: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATE_GAMEPADS:
      return {
        ...state,
        gamepads: action.payload.gamepads,
        gamepadButtons: action.payload.buttons,
      };

    default:
      return state;
  }
}
