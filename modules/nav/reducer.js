import * as constants from './constants';

export const name = 'nav';

const initialState = {
  menuOpen: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };

    default:
      return state;
  }
}
