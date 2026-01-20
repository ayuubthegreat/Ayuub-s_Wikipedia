import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL.js';
import { WEBSITE_ID } from '../../BASE_URL.js';
import { apiCall } from '../utils/apiCall.js';


const BASE_URL_AUTH = BASE_URL + "/auth";
export const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
}


export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        const result = await apiCall(
            'post',
            `${BASE_URL_AUTH}/login`,
            {websiteID: WEBSITE_ID, email, password}
        )
        return result.success ? result.data : rejectWithValue(result.error);
    }
)
export const registerThunk = createAsyncThunk(
    'auth/registerThunk',
    async ({ name, email, password }, { rejectWithValue }) => {
        const result = await apiCall(
            'post',
            `${BASE_URL_AUTH}/register`,
            {websiteID: WEBSITE_ID, name, email, password}
        )
        return result.success ? result.data : rejectWithValue(result.error);
    }
);
export const checkForUserInfo = createAsyncThunk( // For use when user info is null but token exists
    'auth/checkForUserInfo',
    async (__, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_AUTH}/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // Server responded with error
                return rejectWithValue(error.response.data);
            }
            else if (error.request) {
                // Request made but no response
                return rejectWithValue({ 
                    message: 'Cannot connect to server. Please check if the API is running.' 
                });
            }
        }
    }

)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout_reducer: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            console.log("Logout successful.");
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;
            localStorage.setItem('token', action.payload.data.token);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Login failed. Please try again.';
        });
        builder
        .addCase(registerThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;
            localStorage.removeItem('token'); // Clear any existing token
            localStorage.setItem('token', action.payload.data.token);
        })
        .addCase(registerThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Registration failed. Please try again.';
        })
        .addCase(checkForUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(checkForUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            localStorage.removeItem('token');
            localStorage.setItem('token', action.payload.data.token);
            console.log('User info successfully fetched:', action.payload, state.user);
        })
        .addCase(checkForUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch user info.';
            console.error('Failed to fetch user info:', action.payload);
        });
    }
})

export const { logout_reducer, setUser } = authSlice.actions;
export default authSlice.reducer;