import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  loading: false,
  status: false,
  adminData: null,
  isAuthChecked: false,
  error: null,
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/login", { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/admin/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const checkAdminAuth = createAsyncThunk(
  "admin/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get("/admin/protected"); 
      return true;
    } catch (error) {
      return rejectWithValue("Not Authenticated");
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN 
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.adminData = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(adminLogout.fulfilled, (state) => {
        state.status = false;
        state.adminData = null;
        state.isAuthChecked = true;
      })

      // CHECK AUTH
      .addCase(checkAdminAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkAdminAuth.fulfilled, (state) => {
        state.status = true;
        state.isAuthChecked = true;
      })
      .addCase(checkAdminAuth.rejected, (state) => {
        state.status = false;
        state.isAuthChecked = true;
      });
  },
});

export default adminAuthSlice.reducer;
export const { clearError } = adminAuthSlice.actions;