import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "$",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export default uiSlice.reducer;