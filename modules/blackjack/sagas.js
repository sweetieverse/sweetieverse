import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'firebase';

import * as actions from './actions';
import * as api from './api';
import * as constants from './constants';

const config = {
  apiKey: 'AIzaSyBL66HpifAUoBxzr1O-pYTUUZpLBgOKBac',
  authDomain: 'sweetie-bird.firebaseapp.com',
  databaseURL: 'https://sweetie-bird.firebaseio.com',
  projectId: 'sweetie-bird',
};

firebase.initializeApp(config);

const db = firebase.database();

/**
 * Creates an eventChannel, which can emit events that our saga loop
 * is then able to listen for.
 * @returns {Channel<any>}
 */
export function purchasesChannel() {
  return eventChannel((emitter) => {
    const ref = db.ref('/purchases');
    const listener = ref.on('value', (snapshot) => {
      const data = snapshot.val();
      // check your data-- do you want actions emitted??
      emitter({
        type: 'FB_ACTION',
        payload: data,
      });
    });

    // the subscriber must return an unsubscribe function
    return () => {
      db.off(listener);
    };
  });
}

/**
 *  requestBuyRound
 *
 *  Generator function to handle the REQUEST_BUY_ROUND action
 *
 *  Calls the appropriate action, given the api call response
 */
function* requestBuyRound(playerId, giftId, receiverIds) {
  try {
    const response = yield call(api.requestProducts);

    if (response.error) {
      yield put(actions.productsFailure(response.error.message));
    } else {
      const { data } = response.data;

      yield put(actions.productsSuccess(data));
    }
  } catch (error) {
    yield put(actions.productsFailure(error.message));
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
      constants.PRODUCTS_REQUEST,
    ]);

    switch (type) {
      case constants.REQUEST_BUY_ROUND:
        yield fork(requestBuyRound, payload.playerId, payload.giftId, payload.receiverIds);
        break;

      default:
        yield null;
    }
  }
}

export default function* rootSaga() {
  yield watch();
}
