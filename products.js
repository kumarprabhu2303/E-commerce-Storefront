const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticate, requireAuth, requireAdmin } = require('../middleware/auth');

router.use(authenticate, requireAuth, requireAdmin);

// Create item asset
router.post('/', async (req, res) => {
  await Product.create(req.body);
  res.redirect('/admin');
});

// Update item inline stock values
router.post('/:id/stock', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { stock: req.body.stock });
  res.redirect('/admin');
});

module.exports = router;