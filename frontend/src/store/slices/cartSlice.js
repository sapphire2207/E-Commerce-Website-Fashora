import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import { logoutUser } from "../slices/authSlice";

const initialState = {
  loading: false,
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  error: null,
};

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart/get");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ itemId, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart/add", { itemId, size });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ itemId, size, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart/update", {
        itemId,
        size,
        quantity,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
      state.cartCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET CART
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.cartTotal = action.payload.cartTotal;
        state.cartCount = action.payload.cartCount;
      })

      // ADD TO CART
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.cartTotal = action.payload.cartTotal;
        state.cartCount = action.payload.cartCount;
      })

      // UPDATE CART
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.cartTotal = action.payload.cartTotal;
        state.cartCount = action.payload.cartCount;
      })

      // LOGOUT → CLEAR CART
      .addCase(logoutUser.fulfilled, (state) => {
        state.cartItems = [];
        state.cartTotal = 0;
        state.cartCount = 0;
      });
  },
});

export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;