import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/state/slice.js';
import chatsSlice from '../features/chat/state/slice.js';
import socketSlice from '../features/chat/state/socketSlice.js';

const appReducer = combineReducers({
    user: userSlice,
    chats: chatsSlice,
    socket: socketSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;
