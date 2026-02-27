import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socketInstance = null;

const getUserIdFromToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.id;
  } catch {
    return null;
  }
};

const initialState = {
  isConnected: false,
  realtimeNotifications: [],
};

export const connectSocket = (token) => (dispatch) => {

  if (!token || socketInstance) return;

  socketInstance = io(
    import.meta.env.VITE_BACKEND_URL?.replace("/api", "") || "http://localhost:4000",
    {
      withCredentials: true,
      transports: ["websocket", "polling"],
    }
  );

  socketInstance.on("connect", () => {
    dispatch(setConnected(true));

    const userId = getUserIdFromToken(token);
    if (userId) socketInstance.emit("register", userId);
  });

  socketInstance.on("disconnect", () => {
    dispatch(setConnected(false));
  });

  socketInstance.on("notification", (data) => {
    dispatch(addRealtimeNotification(data));
  });

  socketInstance.on("connect_error", () => {
    dispatch(setConnected(false));
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
