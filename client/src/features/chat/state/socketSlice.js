import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import axios from 'axios';

let socket = null;

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const getMessages = createAsyncThunk(
    'socket/getMessages',
    async ({ chatId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authorization token is missing');
            }

            const response = await axios.post(
                `${BASE_URL}/messages/all`,
                { chatId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error.message);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch messages'
            );
        }
    }
);

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
            const exists = state.messages.some(
                (msg) => msg.message_id === action.payload.message_id
            );
            if (!exists) {
                state.messages.push(action.payload);
            }
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.error = null;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch messages';
            });
    },
});

export const { connectSocket, disconnectSocket, addMessage, setError } = socketSlice.actions;

export const initializeSocket = (chatId) => (dispatch) => {
    dispatch(connectSocket());

    // Emit the join_chat event
    socket.emit('join_chat', { chatId });

    // Remove existing listeners before adding a new one to prevent duplicates
    socket.off('receive_message'); // Remove any previous listener for receive_message
    socket.off('error'); // Remove any previous listener for errors

    // Add listeners
    socket.on('receive_message', (message) => {
        console.log('Received message:', message);
        if (message && message.user_id && message.message) {
            dispatch(addMessage(message));
        } else {
            console.error('Received invalid message:', message);
        }
    });

    socket.on('error', (error) => {
        dispatch(setError(error));
    });
};

export const sendMessage = (chatId, message, userId) => () => {
    if (socket) {
        socket.emit('send_message', { chatId, message, userId });
    }
};

export const leaveChat = (chatId) => () => {
    if (socket) {
        socket.emit('leave_chat', { chatId });
    }
};

export default socketSlice.reducer;
