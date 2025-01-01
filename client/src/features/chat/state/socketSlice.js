import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

let socket = null;

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        messages: [],
        isConnected: false,
        error: null,
    },
    reducers: {
        connectSocket(state) {
            if (!socket) {
                socket = io(BASE_URL);
                state.isConnected = true;
            }
        },
        disconnectSocket(state) {
            if (socket) {
                socket.disconnect();
                socket = null;
                state.isConnected = false;
            }
        },
        addMessage(state, action) {
            state.messages.push(action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { connectSocket, disconnectSocket, addMessage, setError } = socketSlice.actions;

export const initializeSocket = (chatId) => (dispatch) => {
    dispatch(connectSocket());

    socket.emit('join_chat', { chatId });

    socket.on('receive_message', (message) => {
        dispatch(addMessage(message));
    });

    socket.on('error', (error) => {
        dispatch(setError(error));
    });
};

export const sendMessage = (chatId, message) => () => {
    if (socket) {
        socket.emit('send_message', { chatId, message });
    }
};

export const leaveChat = (chatId) => () => {
    if (socket) {
        socket.emit('leave_chat', { chatId });
    }
};

export default socketSlice.reducer;