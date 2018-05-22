import game from '../modules/game/sagas';
import user from '../modules/user/sagas';

export default function* rootSaga() {
  yield [
    game(),
    user(),
  ];
}
