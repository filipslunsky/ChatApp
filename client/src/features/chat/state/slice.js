import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CHATS_URL = `${import.meta.env.VITE_API_URL}/chats`;

const initialState = {
    chats: [],
    chatsStatus: 'idle',
    addUserStatus: 'idle',
    removeUserStatus: 'idle',
    editChatNameStatus: 'idle',
    newChatStatus: 'idle',
    deleteChatStatus: 'idle',
    currentParticipants: [],
    currentParticipantsStatus: 'idle',
    error: null,
    message: ''
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
};

export const getChats = createAsyncThunk('chats/getChats', async (_, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${CHATS_URL}/all`,
            { email: user.email },
            { headers }
        );
        return response.data.chats;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addChat = createAsyncThunk('chats/addChat', async (chatName, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${CHATS_URL}/new`,
            {
                email: user.email,
                chatName: chatName
            },
            { headers }
        );
        return response.data.message;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteChat = createAsyncThunk('chats/deleteChat', async (chatId, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${CHATS_URL}/delete`,
            { chatId },
            { headers }
        );
        return response.data.message;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.chatsStatus = 'loading';
                state.error = null;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.chatsStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.chatsStatus = 'success';
                state.chats = action.payload;
                state.error = null;
            })
            .addCase(addChat.pending, (state) => {
                state.newChatStatus = 'loading';
                state.error = null;
            })
            .addCase(addChat.rejected, (state, action) => {
                state.newChatStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(addChat.fulfilled, (state, action) => {
                state.newChatStatus = 'success';
                state.message = action.payload;
                state.error = null;
            })
            .addCase(deleteChat.pending, (state) => {
                state.deleteChatStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.deleteChatStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteChat.fulfilled, (state, action) => {
                state.deleteChatStatus = 'success';
                state.message = action.payload;
                state.error = null;
            })
    },
});


export const { actions: chatsActions } = chatsSlice;
export default chatsSlice.reducer;