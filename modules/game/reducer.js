import * as constants from './constants';

export const name = 'game';

const initialState = {
  user: { id: null }, // current logged in user
  gamepads: [], // gamepad data for the user logged into this client
  buttonPressed: false, // button pressed on current user gamepad?
  players: {}, // all players
  playerIds: [], // all player ids
  objects: {
    cube: {
      position: { x: 0, y: 0, z: 0 },
      quaternion: { w: 0, x: 0, y: 0, z: 0 },
      scale: { x: 0, y: 0, z: 0 },
    },
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        user: {
          ...action.payload.data,
        },
      };

    case constants.UPDATE_GAMEPADS:
      return {
        ...state,
        gamepads: action.payload.gamepads,
        buttonPressed: action.payload.buttonPressed,
      };

    case constants.ADD_PLAYER:
      if (action.payload.playerId === state.user.id) return state;
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

    case constants.UPDATE_GAME_OBJECT:
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.payload.object]: action.payload.data,
        },
      };

    default:
      return state;
  }
}
