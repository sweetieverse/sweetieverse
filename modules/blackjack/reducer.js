import * as constants from './constants';

export const name = 'tables';

const firstTable = {
  id: '$',
  rotation: new Float32Array(4),
  position: new Float32Array(3),
  scale: new Float32Array(3),
};

const initialState = {
  tables: {
    $: firstTable,
  },
  tableIds: ['$'],
  tableConfigs: {
    $: {
      type: 'BLACKJACK',
      name: 'My cool table',
    },
  },
  balls: {
    $: {
      cue: {
        rotation: new Float32Array(4),
        position: new Float32Array(3),
        scale: new Float32Array(3),
      },
      1: {
        rotation: new Float32Array(4),
        position: new Float32Array(3),
        scale: new Float32Array(3),
      },
      2: {
        rotation: new Float32Array(4),
        position: new Float32Array(3),
        scale: new Float32Array(3),
      },
      8: {
        rotation: new Float32Array(4),
        position: new Float32Array(3),
        scale: new Float32Array(3),
      },
    },
  },
  ballConfigs: {
    $: {
      cue: { color: 'white' },
      1: { color: 'blue' },
      2: { color: 'yellow' },
      8: { color: 'black' },
    },
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
