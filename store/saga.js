import user from '../modules/user/sagas';

export default function* rootSaga() {
  yield [
    user(),
  ];
}
