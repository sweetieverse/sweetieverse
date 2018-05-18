import * as constants from './constants';

export const name = 'blackjack';

const firstTable = {
  id: 1,
  rotation: new Float32Array(4),
  position: new Float32Array(3),
  scale: new Float32Array(3),
};

const initialState = {
  tables: {
    1: firstTable,
  },
  tableIds: [1],
  tableConfigs: {
    1: {
      type: 'BLACKJACK',
      name: 'My cool table',
    },
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
