import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/state/slice.js';
import chatsSlice from '../features/chat/state/slice.js';

const appReducer = combineReducers({
    user: userSlice,
    chats: chatsSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;
