import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = process.env.REACT_APP_BASE_URL;

const initialState = {
  orders: [], // Updated to store a list of orders
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Async thunk for fetching all orders
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get(`${api}/orders`, {
        headers: { accesstoken: token, 'Content-Type': 'application/json' },
      });
      return response.data; // Expected to be an array of orders
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  'orders/getAllOrders',
  async (id, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get(`${api}/order?orderId=${id}`, {
        headers: { accesstoken: token, 'Content-Type': 'application/json' },
      });
      return response.data; // Expected to be an array of orders
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  'user/userDetails',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get(`${api}/me`, {
        headers: { accesstoken: token, 'Content-Type': 'application/json' },
      });
      return response.data; // Expected to be an array of orders
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersState(state) {
      state.orders = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload; // Storing fetched orders
        toast.success('Orders fetched successfully!');
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      });
  },
});

export const { clearOrdersState } = ordersSlice.actions;

export default ordersSlice.reducer;
