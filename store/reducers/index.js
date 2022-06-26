import { combineReducers } from 'redux';
import { types } from '../ActionTypes';
import globalReducer from './globalReducer';
import authReducer from './authReducer';
import homeReducer from './homeReducer';

import createClassReducer from './createClassReducer';

const appReducer = combineReducers({
    globalReducer,
    authReducer,
    homeReducer,

    createClassReducer,
});

//resetting every reducer
const rootReducer = (state, action) => {
    if (action.type === types.DESTROY_SESSION)
        state = undefined;

    return appReducer(state, action);
}

export default rootReducer;
