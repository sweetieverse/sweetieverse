import { createSelector, makeSelector } from 'reselect';
import THREE from 'three';

import { name } from './reducer';

const getState = state => state[name];

// creaeteSelector: returns a function that returns a slice of state, e.g.--
// (state, props) => state[objKey]

export const getTables = createSelector(
  [getState],
  state => state.tables,
);

export const getTableIds = createSelector(
  [getState],
  state => state.tableIds,
);

export const getTableConfigs = createSelector(
  [getState],
  state => state.tableConfigs,
);

export const makeGetTablePose = tableId => createSelector(
  [getTables],
  (tables) => {
    const t = tables[tableId];
    return new THREE.Matrix4().compose(t.position, t.rotation, t.scale);
  },
);
