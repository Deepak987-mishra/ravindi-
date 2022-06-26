import { all, fork } from 'redux-saga/effects';
import watchAuthSaga from './authSaga';
import watchCreateClassSaga from './createClassSaga';
import watchHomeSaga from './homeSaga';


// Redux Saga: Root Saga
export function* rootSaga() {
        yield all([
                fork(watchAuthSaga),
                fork(watchCreateClassSaga),
                fork(watchHomeSaga),

        ]);
};