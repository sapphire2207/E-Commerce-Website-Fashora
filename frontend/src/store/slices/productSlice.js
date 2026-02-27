import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  products: [],
  pagination: null,
  product: null,
  homeLoading: false,
  latestCollection: [],
  bestSellers: [],
  relatedProducts: [],
  relatedLoading: false,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product/list", {
        params,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const getHomeProducts = createAsyncThunk(
  "products/getHomeProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product/home");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const getRelatedProducts = createAsyncThunk(
  "products/getRelatedProducts",
  async({category, subCategory, productId}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`/product/relatedProducts/${productId}`, {params: {category, subCategory}});

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.docs;
        state.pagination = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PRODUCT BY ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET HOME PRODUCTS
      .addCase(getHomeProducts.pending, (state) => {
        state.homeLoading = true;
        state.error = null;
      })
      .addCase(getHomeProducts.fulfilled, (state, action) => {
        state.homeLoading = false;
        state.latestCollection = action.payload.latestCollection;
        state.bestSellers = action.payload.bestSellers;
      })
      .addCase(getHomeProducts.rejected, (state, action) => {
        state.homeLoading = false;
        state.error = action.payload;
      })
      // GET RELATED PRODUCTS
      .addCase(getRelatedProducts.pending, (state) => {
        state.relatedLoading = true;
        state.error = null;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.relatedLoading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.relatedLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
