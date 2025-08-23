import Stripe from "stripe";
import express from "express";
import { User } from "../../models/index.js";

const router = express.Router();
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    const { membership } = req.params;

    const priceTable = {
      basic: 500,
      standard: 1500,
      premium: 2500,
      professional: 5000,
    };

    // if the membership type does not exist in the pricing table, then return 400
    if (!Object.keys(priceTable).includes(membership)) {
      return res.status(400).json({
        message: `membership ${membership} does not exist in membership price table`,
      });
    }

    try {
      const user = await User.findById(req.user.id).lean();
      if (!user) return res.status(404).json({ message: "user not found" });

      // find existing customer, or create one if it doesn't exist:
      let customer = await stripe.customers.list({
        email: user.email,
        limit: 1,
      }).data[0];

      if (!customer) {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.username,
          metadata: { appUserId: String(user._id) },
        });
      }

      // fetch reoccuring price, or create it if it does not exist:
      let price = await stripe.prices.search({
        query: `lookup_key: '${membership}'`,
      }).data[0];

      if (!price) {
        price = await stripe.prices.create({
          currency: "usd",
          unit_amount: priceTable[membership],
          recurring: { interval: "month" },
          lookup_key: membership,
          product_data: { name: `Membership: ${membership}` },
        });
      }

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });

      const clientSecret =
        subscription.latest_invoice?.payment_intent?.client_secret;
      if (!clientSecret) {
        return res.status(500).json({ message: "Missing client secret" });
      }

      // store subscription status:
      await User.findByIdAndUpdate(user._id, {
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        subscriptionTier: membership,
        subcriptionStatus: subscription.status,
      });

      return res.status(200).json({
        subscriptonId: subscription.id,
        clientSecret,
        customerId: customer.id,
      });
    } catch (err) {
      console.log("Error while creating subscription", err);
      res.status(400).json({ message: err });
    }
  }
);

export default router;
