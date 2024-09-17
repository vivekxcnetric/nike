import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const api = process.env.REACT_APP_BASE_URL;

// Thunk to fetch cart data
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(`${api}/cart`, {
      headers: { accesstoken: token },
    });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

// Thunk to update cart item quantity
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ lineId, quantity }, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.put(`${api}/cart`, {
      lineId,
      quantity,
    }, {
      headers: { accesstoken: token, 'Content-Type': 'application/json' },
    });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

// Thunk to delete cart item
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (lineId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.delete(`${api}/cart?lineId=${lineId}`, {
      headers: { accesstoken: token },
    });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});
// Thunk to fetch eligible dealers
// Thunk to fetch eligible dealers
export const fetchEligibleDealers = createAsyncThunk('cart/fetchEligibleDealers', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;

    const response = await axios.get(`${api}/elgDealers`, {
      headers: {
        accesstoken: token,
      },
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    eligibleDealers: null,  // Add eligibleDealers state
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart cases
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update cart item cases
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Cart updated successfully!');
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        toast.error(`Failed to update cart: ${action.payload}`);
      })

      // Delete cart item cases
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Item removed successfully!');
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        toast.error(`Failed to remove item: ${action.payload}`);
      })

      // Fetch eligible dealers cases
      .addCase(fetchEligibleDealers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEligibleDealers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eligibleDealers = action.payload;
      })
      .addCase(fetchEligibleDealers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

