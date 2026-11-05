const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const cartItems = JSON.parse(session.metadata.cartData);

    await Order.create({
      userId: session.metadata.userId,
      items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
      totalAmount: session.amount_total / 100,
      stripeSessionId: session.id,
      paymentStatus: 'paid'
    });

    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
    }
  }
  res.json({ received: true });
});

module.exports = router;