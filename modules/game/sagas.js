import { call, fork, put, take, all } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import * as actions from './actions';
import * as constants from './constants';
import * as parse from './parse';

const fb = global.window ? window.firebase : null;

function firebasePlayersChannel() {
  return eventChannel((emitter) => {
    if (!fb) return () => {};

    const db = fb.database();

    const handle = db.ref('players').on('child_added', (snapshot) => {
      const val = snapshot.val();
      const playerMap = parse.singlePlayerMap(val);
      const playerId = parse.singlePlayerId(val);
      emitter(actions.fbReceivedPlayers(playerMap, playerId));
    });

    // the subscriber must return an unsubscribe function
    return () => db.off(handle);
  });
}

/**
 *  Generator function to listen for redux actions
 *
 *  Handles any action api requests as non-blocking calls and
 *    returns the appropriate action responses
 */
function* watch() {
  while (true) {
    const { type, payload = {} } = yield take([]);

    switch (type) {
      default:
        yield null;
    }
  }
}

/**
 *  Generator function to listen for saga event channel emissions
 */
export function* eventChannelWatch() {
  const channel = yield call(firebasePlayersChannel);

  try {
    while (true) {
      const { type, payload = {} } = yield take(channel);

      switch (type) {
        case constants.FB_RECEIVED_PLAYERS:
          yield put(actions.addPlayer(payload.playerMap, payload.playerId));
          break;

        default:
          yield null;
          break;
      }
    }
  } catch (error) {
    console.log(error, error.message);
    yield null;
  }
}

export default function* rootSaga() {
  yield all([
    watch(),
    eventChannelWatch(),
  ]);
}
