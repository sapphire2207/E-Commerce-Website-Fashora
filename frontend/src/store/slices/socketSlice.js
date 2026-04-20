import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

let socketInstance = null;

const getUserIdFromAuthIdentity = (authIdentity) => {
  if (!authIdentity) return null;

  if (typeof authIdentity === "object") {
    return authIdentity._id || authIdentity.id || null;
  }

  if (typeof authIdentity !== "string") {
    return null;
  }

  if (!authIdentity.includes(".")) {
    return authIdentity;
  }

  try {
    const payload = authIdentity.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.id || decodedPayload._id || null;
  } catch {
    return null;
  }
};

const initialState = {
  isConnected: false,
  realtimeNotifications: [],
};

const getSocketServerUrl = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!backendUrl) {
    return "http://localhost:3000";
  }

  try {
    return new URL(backendUrl).origin;
  } catch {
    return "http://localhost:3000";
  }
};

export const connectSocket = (token) => (dispatch) => {

  if (!token || socketInstance) return;

  socketInstance = io(getSocketServerUrl(), {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  socketInstance.on("connect", () => {
    dispatch(setConnected(true));

    const userId = getUserIdFromAuthIdentity(token);
    if (userId) {
      socketInstance.emit("register", userId);
      console.log("Socket registered for user:", userId);
    }
  });

  socketInstance.on("disconnect", () => {
    dispatch(setConnected(false));
  });

  socketInstance.on("notification", (data) => {
    dispatch(addRealtimeNotification(data));

    const message = data?.message || "Your order status has been updated";
    const toastId =
      data?.orderId && data?.status
        ? `order-status-${data.orderId}-${data.status}`
        : undefined;

    toast.info(message, { toastId });
  });

  socketInstance.on("connect_error", (error) => {
    dispatch(setConnected(false));
    console.error("Socket connect_error:", error?.message || error);
  });
};

export const disconnectSocket = () => (dispatch) => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }

  dispatch(disconnectSocketState());
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },

    addRealtimeNotification: (state, action) => {
      state.realtimeNotifications.unshift(action.payload);
    },

    clearRealtimeNotifications: (state) => {
      state.realtimeNotifications = [];
    },

    disconnectSocketState: (state) => {
      state.isConnected = false;
      state.realtimeNotifications = [];
    },
  },
});

export const {
  setConnected,
  addRealtimeNotification,
  clearRealtimeNotifications,
  disconnectSocketState,
} = socketSlice.actions;

export default socketSlice.reducer;
