import { createSelector } from 'reselect';

import { name } from './reducer';

const getState = state => state[name];

export const getProduct = createSelector(
  [getState],
  state => state.product,
);

export const getIsFetching = createSelector(
  [getState],
  state => state.isFetching,
);
