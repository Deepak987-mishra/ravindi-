import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineReducers from './reducers';
import { rootSaga } from './sagas';

let store;

// Middleware: Redux Saga
sagaMiddleware = createSagaMiddleware();
middleware = applyMiddleware(sagaMiddleware);
// Redux: Store
store = createStore(
    combineReducers,
    middleware,
)

sagaMiddleware.run(rootSaga);

export { store };
