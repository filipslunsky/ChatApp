import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = `${import.meta.env.VITE_API_URL}/user`;

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
    },
    token: null,
    loggedIn: false,
    logMessage: null,
    registerStatus: '',
    editStatus: '',
};

const loadUserFromLocalStorage = () => {
    if (typeof localStorage !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            return {
                user: JSON.parse(storedUser),
                loggedIn: true,
                token: storedToken,
                logMessage: 'Logged in successfully',
                registerStatus: '',
                editStatus: '',
            };
        }
    }
    return initialState;
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${USER_URL}/login`, credentials);

            const { success, passwordMatch, firstName, lastName, email, token } = response.data;

            if (success && passwordMatch) {
                localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
                localStorage.setItem('token', token);
                return { firstName, lastName, email, token, logMessage: 'Logged in successfully' };
            } else if (success && !passwordMatch) {
                throw new Error('Wrong password');
            } else {
                throw new Error('User does not exist');
            }
        } catch (error) {
            console.error('Login failed with error:', error.message);

            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue('Login failed - check your credentials or try again later');
            }
        }
    }
);

export const registerUser = createAsyncThunk('user/registerUser', async (newUser) => {
    const response = await axios.post(`${USER_URL}/register`, newUser);
    return response.data;
});

export const editUser = createAsyncThunk('user/editUser', async (editItem) => {
    const headers = getHeaders();
    const response = await axios.put(USER_URL, editItem, { headers });
    
    if (response.data.success) {
        const { firstName, lastName } = response.data;
        const userJSON = localStorage.getItem('user');
        const user = userJSON ? JSON.parse(userJSON) : {};
        
        localStorage.setItem('user', JSON.stringify({
            ...user,
            firstName,
            lastName
        }));

        return response.data;
    } else {
        return response.data;
    }
});

export const deleteUser = createAsyncThunk('user/delete', async (deleteItem, { rejectWithValue }) => {
    try {
        const headers = getHeaders();
        const response = await axios.post(`${USER_URL}/delete`, deleteItem, { headers });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Delete user failed');
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: loadUserFromLocalStorage(),
    reducers: {
        logoutUser: (state) => {
            state.user = { firstName: '', lastName: '', email: '' };
            state.loggedIn = false;
            state.token = null;
            state.logMessage = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        resetRegisterStatus: (state) => {
            state.registerStatus = '';
        },
        resetEditStatus: (state) => {
            state.editStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
            };
            state.token = action.payload.token;
            state.loggedIn = true;
            state.logMessage = action.payload.logMessage;
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.error("Login failed:", action.payload || "An unexpected error occurred");
            state.loggedIn = false;
            state.logMessage = action.payload || "An unexpected error occurred";
        })
        .addCase(registerUser.pending, (state) => {
            state.registerStatus = 'loading';
        })
        .addCase(registerUser.rejected, (state) => {
            state.registerStatus = 'failed';
            state.logMessage = action.error.message;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.registerStatus = 'success';
        })
        .addCase(editUser.pending, (state) => {
            state.editStatus = 'loading';
        })
        .addCase(editUser.rejected, (state) => {
            state.editStatus = 'failed';
            // state.logMessage = action.error.message;
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.editStatus = 'success';
            state.user = {
                firstName: action.payload.firstName || state.user.firstName || '',
                lastName: action.payload.lastName || state.user.lastName || '',
                email: state.user.email || ''
            };
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.logMessage = action.payload || 'Failed to delete user';
        })
    },
});

export const { logoutUser, resetEditStatus, resetRegisterStatus } = userSlice.actions;
export default userSlice.reducer;
