import {Server} from "socket.io";
import ApiError from "./apiError.js";

let io;

const userSocketMap = new Map();

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true,
            methods: ["GET", "POST", "PATCH", "DELETE"],
        }
    });

    io.on("connection", (socket) => {
        console.log("New Client Connected To The Socket:", socket.id);

        socket.on("register", (userId) => {
            if(userId) {
                userSocketMap.set(userId.toString(), socket.id);
                console.log(`User ${userId} Registered With Socket ${socket.id}`);
            }
        });

        socket.on("disconnect", () => {
            for(let [userId, socketId] of userSocketMap.entries()) {
                if(socketId == socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`User ${userId} Disconnected With Socket ${socket.id}`);
                    break;
                }
            }
        })
    })
    return io;
}

export const getIo = () => {
    if(!io) {
        throw new ApiError(400, "Socket.io not initialized");
    }
    return io;
}

export const getUserSocketId = (userId) => {
    return userSocketMap.get(userId.toString());
}

export const emitToUser = (userId, event, data) => {
    const socketId = getUserSocketId(userId);
    if(socketId) {
        io.to(socketId).emit(event, data);
        return true;
    }
    return false;
}