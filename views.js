const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticate, requireAuth, requireAdmin } = require('../middleware/auth');

router.use(authenticate);

// Storefront Catalog
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  let query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (category && category !== 'All') query.category = category;

  const products = await Product.find(query);
  const categories = await Product.distinct('category');
  res.render('storefront', { products, categories, user: req.user, search, category });
});

// Shopping Cart View
router.get('/cart', (req, res) => {
  res.render('cart', { user: req.user });
});

// Auth Views
router.get('/login', (req, res) => { if (req.user) return res.redirect('/'); res.render('login', { user: req.user }); });
router.get('/register', (req, res) => { if (req.user) return res.redirect('/'); res.render('register', { user: req.user }); });

// Admin Protected Dashboard
router.get('/admin', requireAuth, requireAdmin, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
  res.render('admin', { products, orders, user: req.user });
});

// Success handling page
router.get('/success', (req, res) => res.render('success', { user: req.user }));

module.exports = router;