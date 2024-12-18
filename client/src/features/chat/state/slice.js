import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const CHATS_URL = `${import.meta.env.VITE_API_URL}/chats`;

const initialState = {
    chats: [],
    chatsStatus: 'idle',
    addUserStatus: 'idle',
    removeUserStatus: 'idle',
    editChatNameStatus: 'idle',
    newChatStatus: 'idle',
    currentParticipants: [],
    currentParticipantsStatus: 'idle',
    error: null,
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
            });
    },
});


export const { actions: chatsActions } = chatsSlice;
export default chatsSlice.reducer;