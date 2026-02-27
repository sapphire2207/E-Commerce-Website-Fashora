import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  notifications: [],
  error: null,
};

export const getAllOrderNotifications = createAsyncThunk(
    "/notfication/getAllOrderNotifications",
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get("/notification/");

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.error);
        }
    }
)

export const markOrderNotficationAsRead = createAsyncThunk(
    "/notification/markOrderNotficationAsRead",
    async({notificationId}, {rejectWithValue}) => {
        try {
            await axiosInstance.patch("/notification/read", {notificationId})

            return notificationId;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.error);
        }
    }
)

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllOrderNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllOrderNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
    })
    .addCase(getAllOrderNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
    })
    .addCase(markOrderNotficationAsRead.fulfilled, (state, action) => {
        const id = action.payload;

        const notification = state.notifications.find(n => n._id === id);
        if (notification) notification.isRead = true;
    })
  },
});

export default notificationSlice.reducer;