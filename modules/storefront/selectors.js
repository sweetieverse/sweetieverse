import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];

export const getProducts = createSelector(
  [getState],
  state => state.products,
);

export const getIsFetching = createSelector(
  [getState],
  state => state.isFetching,
);
