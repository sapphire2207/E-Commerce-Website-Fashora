import Stripe from "stripe";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new ApiError(500, "Stripe secret key not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const stripeWebhook = async (req, res) => {
  const stripe = getStripe();
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook Signature Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata.orderId;
    const userId = session.metadata.userId;

    try {
      const order = await orderModel.findById(orderId);

      if (order && !order.payment) {
        order.payment = true;
        order.status = "Confirmed";
        await order.save();

        await userModel.findByIdAndUpdate(userId, {
          $set: { cartItems: [] },
        });
      }
    } catch (err) {
      console.log("Database Error:", err.message);
      return res.status(500).send("Database error");
    }
  }

  res.status(200).send("Webhook received");
};

export default stripeWebhook;
