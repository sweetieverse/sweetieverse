import * as constants from './constants';

export const name = 'game';

const initialState = {
  gamepads: [], // gamepad data for the user logged into this client
  buttonPressed: false, // button pressed on current user gamepad?
  players: {}, // all players
  playerIds: [], // all player ids
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATE_GAMEPADS:
      return {
        ...state,
        gamepads: action.payload.gamepads,
        buttonPressed: action.payload.buttonPressed,
      };

    case constants.ADD_PLAYER:
      return {
        ...state,
        players: {
          ...state.players,
          ...action.payload.playerMap,
        },
        playerIds: [
          ...state.playerIds,
          action.payload.playerId,
        ],
      };

    default:
      return state;
  }
}
