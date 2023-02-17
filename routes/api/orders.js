const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);

// POST /api/orders/cart/products/:id
router.post('/cart/products/:id', ordersCtrl.addToCart);

// POST /api/orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);

// GET /api/orders/history
router.get('/history', ordersCtrl.history);

// POST /api/orders/cart/qty
router.put('/cart/qty', ordersCtrl.setProdQtyInCart);

module.exports = router;