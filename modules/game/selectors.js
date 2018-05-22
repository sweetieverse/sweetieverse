import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];

export const getUser = createSelector(
  [getState],
  state => state.user,
);

export const getUserId = createSelector(
  [getUser],
  user => user.id,
);

export const getGamepads = createSelector(
  [getState],
  state => state.gamepads,
);

export const getButtonPressed = createSelector(
  [getState],
  state => state.buttonPressed,
);

export const getPlayers = createSelector(
  [getState],
  state => state.players,
);

export const getPlayerIds = createSelector(
  [getState],
  state => state.playerIds,
);

export const makeGetPlayerById = id => createSelector(
  [getPlayers],
  players => players[id],
);

export const getObjects = createSelector(
  [getState],
  state => state.objects,
);

export const getCube = createSelector(
  [getObjects],
  objects => objects.cube,
);
