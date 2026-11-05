const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');
const { authenticate, requireAuth } = require('../middleware/auth');

router.post('/', authenticate, requireAuth, async (req, res) => {
  try {
    const { cart } = req.body;
    const parsedCart = JSON.parse(cart);

    const lineItems = await Promise.all(parsedCart.map(async (item) => {
      const dbProduct = await Product.findById(item.id);
      if (!dbProduct || dbProduct.stock < item.quantity) throw new Error(`${item.name} is out of stock`);
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: dbProduct.name },
          unit_amount: Math.round(dbProduct.price * 100),
        },
        quantity: item.quantity,
      };
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cart`,
      metadata: { userId: req.user.userId, cartData: JSON.stringify(parsedCart) },
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;