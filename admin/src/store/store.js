import { configureStore } from "@reduxjs/toolkit";
import adminAuthSliceReducer from "./slices/adminAuthSlice.js"
import productSliceReducer from "./slices/productSlice.js"
import orderSliceReducer from "./slices/orderSlice.js"
import uiSliceReducer from "./slices/uiSlice.js"
import aiReducer from "./slices/aiSlice";

const store = configureStore({
    reducer: {
        adminAuth: adminAuthSliceReducer,
        products: productSliceReducer,
        order: orderSliceReducer,
        ui: uiSliceReducer,
        ai: aiReducer,
    }
});

export default store;