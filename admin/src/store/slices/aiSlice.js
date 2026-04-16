import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAIJob, getAIJob } from "../../helpers/aiApi";

export const startAIJob = createAsyncThunk(
  "ai/start",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createAIJob(payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to start AI job",
      );
    }
  }
);

export const fetchAIResult = createAsyncThunk(
  "ai/result",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await getAIJob(jobId);
      console.log("API STATUS:", res.data.data.status);
      console.log("API RESULT:", res.data.data.result);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to fetch AI job status",
      );
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    jobId: null,
    status: "idle",
    result: "",
    loading: false,
    error: null,
  },
  reducers: {
    resetAI: (state) => {
      state.jobId = null;
      state.status = "idle";
      state.result = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startAIJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startAIJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobId = action.payload.jobId;
        state.status = "pending";
        state.error = null;
      })
      .addCase(startAIJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAIResult.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAIResult.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.result = action.payload.result;
        state.error = action.payload.error || null;
      })
      .addCase(fetchAIResult.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch AI result";
      });
  },
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer;