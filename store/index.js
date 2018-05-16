import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';

const composeEnhancers = typeof window !== 'undefined'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const store = createStore(
    reducer,
    {},
    composeEnhancers(applyMiddleware(...middleware)),
  );

  sagaMiddleware.run(saga);

  return store;
}
