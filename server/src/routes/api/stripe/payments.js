import Stripe from "stripe";
import express from "express";
import { User } from "../../../models";
import { authenticateMiddleware } from "../../../utils/auth";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment/:label", async (req, res) => {
  const amount = 20 * 100; // 20$
  const currency = "usd";
  const { label } = req.query;

  try {
    const user = User.findById(req.user.id);

    const { client_secret } = await stripe.paymentIntents.create({
      description: label,
      amount,
      currency,
      metadata: {
        customer_name: user.username,
        customer_email: user.email,
      },
    });

    res.json({ clientSecret: client_secret });
  } catch (err) {
    console.log("Error while creating payment intent: ", err);
  }
});

router.post(
  "/create-subscription/:membership",
  authenticateMiddlware,
  async (req, res) => {
    const { membership } = req.user;

    try {
      const user = User.findById(req.user.id);
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });

      // TODO: fetch reoccuring price, or create it if it does not exist:
      let price = ... 

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });
    } catch (err) {
      console.log("Error while creating subscription", err);
    }
  }
);

export default router;
