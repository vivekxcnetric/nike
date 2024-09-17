import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = process.env.REACT_APP_BASE_URL;

// Asynchronous action for the checkout API request
export const initiateCheckout = createAsyncThunk(
  'checkout/initiateCheckout',
  async ({ cartId, shippingAddress }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/checkout`, {
        cartId,
        shippingAddress,
      }, {
        headers: {
          accesstoken: 'your-token', // Replace with your actual token
          'Content-Type': 'application/json',
        },
      });
      
      const { orderId, expectedDelivery } = response.data;
      return { orderId, expectedDelivery }; // Return data directly to the reducer
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Asynchronous action for adding an address
export const addAddress = createAsyncThunk(
  'auth/addAddress',
  async (formData, { rejectWithValue }) => {
    console.log(formData,"async")
    try {
      const response = await axios.post(`${api}/me/addresses`, formData);
      return response.data; // Return the data to the reducer
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Checkout slice definition
export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    shippingAddress: {},
    orderId: null,
    expectedDelivery: null,
    error: null, // To track errors
    status: 'idle', // To track loading status
  },
  reducers: {
    // Action to save shipping address in the state
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the `initiateCheckout` action
    builder
      .addCase(initiateCheckout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initiateCheckout.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.expectedDelivery = action.payload.expectedDelivery;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(initiateCheckout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handle the `addAddress` action
    builder
      .addCase(addAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.shippingAddress = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Exporting the actions and the reducer
export const { saveShippingAddress } = checkoutSlice.actions;
export default checkoutSlice.reducer;
