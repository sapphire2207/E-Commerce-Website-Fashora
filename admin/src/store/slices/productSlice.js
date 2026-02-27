import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  products: [],
  pagination: null,
  product: null,
  error: null,
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ productData, params }, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("subCategory", productData.subCategory);
      formData.append("bestSeller", productData.bestSeller);
      formData.append("sizes", JSON.stringify(productData.sizes));

      productData.image1 && formData.append("image1", productData.image1);
      productData.image2 && formData.append("image2", productData.image2);
      productData.image3 && formData.append("image3", productData.image3);
      productData.image4 && formData.append("image4", productData.image4);

      const res = await axiosInstance.post("/product/add", formData);

      dispatch(getAllProducts(params));

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error);
    }
  },
);

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

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async ({productId, params}, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post(`/product/remove/${productId}`);

      dispatch(getAllProducts(params));

      return productId;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error);
    }
  },
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/product/${productId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData, params }, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();

      if (productData.name) formData.append("name", productData.name);
      if (productData.description)
        formData.append("description", productData.description);
      if (productData.price) formData.append("price", productData.price);
      if (productData.category)
        formData.append("category", productData.category);
      if (productData.subCategory)
        formData.append("subCategory", productData.subCategory);
      if (productData.bestSeller !== undefined)
        formData.append("bestSeller", productData.bestSeller);
      if (productData.sizes)
        formData.append("sizes", JSON.stringify(productData.sizes));

      productData.image1 && formData.append("image1", productData.image1);
      productData.image2 && formData.append("image2", productData.image2);
      productData.image3 && formData.append("image3", productData.image3);
      productData.image4 && formData.append("image4", productData.image4);

      const res = await axiosInstance.patch(
        `/product/update/${productId}`,
        formData,
      );
      
      dispatch(getAllProducts(params));
      
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSingleProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET LIST
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.docs || action.payload || [];
        state.pagination = action.payload || null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSingleProduct } = productSlice.actions;
export default productSlice.reducer;
