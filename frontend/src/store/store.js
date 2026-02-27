import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js"
import productSliceReducer from "./slices/productSlice.js"
import cartSliceReducer from "./slices/cartSlice.js"
import orderSliceReducer from "./slices/orderSlice.js"
import notificationSliceReducer from "./slices/notificationSlice.js"
import socketSliceReducer from "./slices/socketSlice.js"
import uiSliceReducer from "./slices/uiSlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        products: productSliceReducer,
        cart: cartSliceReducer,
        order: orderSliceReducer,
        notification: notificationSliceReducer,
        socket: socketSliceReducer,
        ui: uiSliceReducer,
    }
});

export default store;