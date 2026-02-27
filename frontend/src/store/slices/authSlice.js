import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  status: false,
  userData: null,
  isAuthChecked: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/register",
        data
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        data
      );

      return response.data.user;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/refreshAccessToken");

      const response = await axiosInstance.get("user/me");

      return response.data.data;
    } catch (error) {
      return rejectWithValue("Not Authenticated");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
    state.error = null;
  }
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN 
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.userData = null;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.status = false;
        state.userData = null;
      })

      // CHECK AUTH 
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = false;
        state.userData = null;
        state.isAuthChecked = true;
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions;