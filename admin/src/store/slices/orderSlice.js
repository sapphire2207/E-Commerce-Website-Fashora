import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  orderData: [],
  pagination: null,
  error: null,
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/list", { params });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status, params }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.patch("/order/status", {
        orderId,
        status,
      });

      dispatch(getOrders(params));

      return true;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ORDERS
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.docs;
        state.pagination = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
