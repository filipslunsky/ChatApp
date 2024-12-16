import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/state/slice.js';

const appReducer = combineReducers({
    user: userSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;
