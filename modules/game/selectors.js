import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];

export const getGamepads = createSelector(
  [getState],
  state => state.gamepads,
);

export const getButtonPressed = createSelector(
  [getState],
  state => state.buttonPressed,
);
