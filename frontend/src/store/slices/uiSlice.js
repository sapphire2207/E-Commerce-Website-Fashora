import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSearch: false,
  currency: "$",
  deliveryFee: 10,
  search: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.showSearch = true;
    },
    closeSearch: (state) => {
      state.showSearch = false;
    },
    toggleSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
});

export const { openSearch, closeSearch, toggleSearch, setSearch } = uiSlice.actions;
export default uiSlice.reducer;