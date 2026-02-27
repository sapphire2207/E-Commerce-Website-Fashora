import express, { Router } from "express";
import stripeWebhook from "../controllers/webhook.controller.js";

const webhookRouter = Router();

webhookRouter
  .route("/stripe")
  .post(
    express.raw({ type: "application/json" }),
    stripeWebhook
  );

export default webhookRouter;
