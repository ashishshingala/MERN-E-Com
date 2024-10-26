import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../Interceptor";

const initialState = {
  products: [],
  loading: false,
  error: null,
};
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });
      const response = await axiosInterceptor.post(
        "/product/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosInterceptor.get("/product/get-product");
    return response;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptor.get(
        `/product/search-products?q=${query}`
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
