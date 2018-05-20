import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];

export const getIsFetching = createSelector(
  [getState],
  state => state.isFetching,
);

export const getIsAuthenticated = createSelector(
  [getState],
  state => state.isAuthenticated,
);

export const getUser = createSelector(
  [getState],
  state => state[name],
);
