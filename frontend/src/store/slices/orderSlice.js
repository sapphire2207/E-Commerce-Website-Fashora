import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import { clearCart } from "../slices/cartSlice";

const initialState = {
  loading: false,
  orderData: [],
  pagination: null,
  orderType: null,
  error: null,
};

export const getUserOrderData = createAsyncThunk(
  "order/getUserOrderData",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/order/userorders", { params });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const placeCodOrder = createAsyncThunk(
  "order/placeCodOrder",
  async ({ items, address }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/order/place", {
        items,
        address,
      });

      dispatch(clearCart());

      dispatch(getUserOrderData());

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const placeStripeOrder = createAsyncThunk(
  "order/placeStripeOrder",
  async ({ items, address }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/order/stripe", {
        items,
        address,
      });

      return response.data.data.session_url;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

export const verifyStripeOrder = createAsyncThunk(
  "order/verifyStripeOrder",
  async ({ orderId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/order/verifyStripe", {
        orderId,
      });

      dispatch(clearCart());
      dispatch(getUserOrderData());

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrderData.fulfilled, (state, action) => {
        state.loading = false;

        const orders = action.payload.docs;
        const allOrderItems = [];

        orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.createdAt,
            });
          });
        });

        state.orderData = allOrderItems;
        state.pagination = action.payload;
      })
      .addCase(getUserOrderData.rejected, (state, action) => {
        state.loading = false;
        state.orderData = [];
        state.pagination = null;
        state.orderType = null;
        state.error = action.payload;
      })
      .addCase(placeCodOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeCodOrder.fulfilled, (state) => {
        state.loading = false;
        state.orderType = "cod";  
      })
      .addCase(placeCodOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(placeStripeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeStripeOrder.fulfilled, (state) => {
        state.loading = false;
        state.orderType = "stripe";
      })
      .addCase(placeStripeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyStripeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyStripeOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyStripeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
