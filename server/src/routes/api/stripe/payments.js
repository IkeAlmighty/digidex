import Stripe from "stripe";
import express from "express";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment/event-publication", async (_req, res) => {
  const amount = 20 * 100; // 20$
  const currency = "usd";
  try {
    const { client_secret } = await stripe.paymentIntents.create({
      amount,
      currency,
      // TODO: add customer details?
    });

    res.json({ clientSecret: client_secret });
  } catch (err) {
    console.log("Error while creating payment intent: ", err);
  }
});

export default router;
