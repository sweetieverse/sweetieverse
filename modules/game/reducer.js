import * as constants from './constants';

export const name = 'game';

const initialState = {
  gamepads: [],
  buttonPressed: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATE_GAMEPADS:
      return {
        ...state,
        gamepads: action.payload.gamepads,
        buttonPressed: action.payload.buttonPressed,
      };

    default:
      return state;
  }
}
