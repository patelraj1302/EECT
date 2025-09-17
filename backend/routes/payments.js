import express from 'express';
import Stripe from 'stripe';
const router = express.Router();

// Create a PaymentIntent (Stripe) - frontend uses the client_secret to confirm
router.post('/create-intent', async (req,res)=>{
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return res.status(400).json({ error: 'Set STRIPE_SECRET_KEY in .env' });
    const stripe = new Stripe(stripeKey);
    const { amount, currency='inr' } = req.body;
    if (!amount) return res.status(400).json({ error: 'amount required (in minor units)' });
    const intent = await stripe.paymentIntents.create({ amount, currency, automatic_payment_methods: { enabled: true } });
    res.json({ clientSecret: intent.client_secret });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Payment error' });
  }
});

export default router;
