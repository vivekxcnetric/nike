import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  token: sessionStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};
const api = process.env.REACT_APP_BASE_URL;
// Signup thunk
export const signupUser = createAsyncThunk('auth/signupUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});

// Login thunk
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api}/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      toast.info('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    // Signup Reducers
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
        toast.success('Signup successful!');
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Signup failed: ${action.payload}`);
      });

    // Login Reducers
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        
        // Store token and user in sessionStorage
        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('user', JSON.stringify(action.payload.user));

        toast.success('Login successful!');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
