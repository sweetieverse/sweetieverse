import { call, fork, put, take, all } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';

import * as api from './api';
import * as actions from './actions';
import * as constants from './constants';
import * as parse from './parse';

const fb = global.window ? window.firebase : null;

function firebasePlayersChannel() {
  return eventChannel((emitter) => {
    if (!fb) return () => {};

    const db = fb.database();

    // const handle = db.ref('players').on('child_changed', (snapshot) => {
    //   const val = snapshot.val();
    //   const playerMap = parse.singlePlayerMap(val);
    //   const playerId = parse.singlePlayerId(val);
    //   emitter(actions.fbReceivedPlayers(playerMap, playerId));
    // });

    const objectHandle = db.ref('cube').on('value', (snapshot) => {
      const val = snapshot.val();
      emitter(actions.fbReceivedObjectData('cube', val));
    });

    // the subscriber must return an unsubscribe function
    return () => {
      // db.off(handle);
      db.off(objectHandle);
    };
  });
}

function* setUser(id, data) {
  try {
    yield call(api.setUser, id, data);
  } catch (error) {
    console.log(error, error.message);
    yield null;
  }
}

function* updateUserGamepads(id, gamepads) {
  try {
    yield call(api.updateUserGamepads, id, gamepads);
  } catch (error) {
    console.log(error, error.message);
    yield null;
  }
}

function* updateGameObject(object, data) {
  try {
    yield call(api.updateGameObject, object, data);
  } catch (error) {
    console.log(error, error.message);
    yield null;
  }
}

/**
 *  Generator function to listen for redux actions
 *
 *  Handles any action api requests as non-blocking calls and
 *    returns the appropriate action responses
 */
function* watch() {
  while (true) {
    const { type, payload = {} } = yield take([
      constants.SET_USER,
      constants.UPDATE_USER_GAMEPADS,
      constants.UPDATE_GAME_OBJECT,
    ]);

    switch (type) {
      case constants.SET_USER:
        yield fork(setUser, payload.id, payload.data);
        break;

      case constants.UPDATE_USER_GAMEPADS:
        yield fork(updateUserGamepads, payload.id, payload.gamepads);
        break;

      case constants.UPDATE_GAME_OBJECT:
        yield fork(updateGameObject, payload.object, payload.data);
        break;

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
          yield delay(500);
          break;

        case constants.FB_RECEIVED_OBJECT_DATA:
          yield put(actions.updateGameObject(payload.object, payload.data));
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
