import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = process.env.REACT_APP_BASE_URL;

const initialState = {
  product: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Async thunk for fetching product by ID
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/product?productId=${productId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductState(state) {
      state.product = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
        toast.success('Product fetched successfully!');
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Failed to fetch product: ${action.payload}`);
      });
  },
});

export const { clearProductState } = productSlice.actions;

export default productSlice.reducer;
