import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = process.env.REACT_APP_BASE_URL;

const initialState = {
  cart: [], // List of items in the cart
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Async thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    console.log(item)
    try {
      const response = await axios.post(`${api}/cart`, item, {
        headers: { accesstoken: token, 'Content-Type': 'application/json' },
      });
      return response.data; // Expected to be the updated cart
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState(state) {
      state.cart = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; // Updating the cart with the response data
        toast.success('Item added to cart successfully!');
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Failed to add item to cart: ${action.payload}`);
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
