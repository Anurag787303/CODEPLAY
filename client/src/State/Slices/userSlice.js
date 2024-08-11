// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for user registration
export const registerUser = createAsyncThunk('user/registerUser', async (userData, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Async thunk for fetching user information
export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include',
            },
        });

        console.log(response);

        if (!response.ok) {
            const error = await response.json();
            return thunkAPI.rejectWithValue(error);
        }

        const data = await response.json();

        return data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;