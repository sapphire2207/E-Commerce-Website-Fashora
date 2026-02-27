import { configureStore } from "@reduxjs/toolkit";
import adminAuthSliceReducer from "./slices/adminAuthSlice.js"
import productSliceReducer from "./slices/productSlice.js"
import orderSliceReducer from "./slices/orderSlice.js"
import uiSliceReducer from "./slices/uiSlice.js"

const store = configureStore({
    reducer: {
        adminAuth: adminAuthSliceReducer,
        products: productSliceReducer,
        order: orderSliceReducer,
        ui: uiSliceReducer
    }
});

export default store;