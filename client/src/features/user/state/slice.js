import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        token: '',
    }
};



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const {  } = userSlice.actions;
export default userSlice.reducer;
