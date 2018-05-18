import * as constants from './constants';

export const name = 'tables';

const firstTable = {
  id: '$',
  posX: 0,
  rotX: 0,
};

const initialState = {
  isFetching: false,
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
        posX: 0,
        rotX: 0,
      },
      1: {
        posX: 0,
        rotX: 0,
      },
      2: {
        posX: 0,
        rotX: 0,
      },
      8: {
        posX: 0,
        rotX: 0,
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
    case constants.UPDATE_TABLE_POSE:
      return {
        ...state,
        tables: {
          ...state.tables,
          [action.payload.tableId]: {
            ...state.tables[action.payload.tableId],
            posX: action.payload.posX,
            rotX: action.payload.rotX,
          },
        },
      };

    default:
      return state;
  }
}
