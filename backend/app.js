import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {createServer} from 'http';
import { initializeSocket } from './utils/socket.js';
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import adminRouter from "./routes/admin.routes.js";
import webhookRouter from "./routes/webhook.routes.js";

const app = express();

const server = createServer(app);

initializeSocket(server);

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1/webhook", webhookRouter);
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/notification', notificationRouter);

export default app;