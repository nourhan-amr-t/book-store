const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart routes
router.post('/add', cartController.addToCart);
router.patch('/update', cartController.updateQuantity);
router.delete('/clear', cartController.clearCart);
router.post('/save', cartController.saveCart);


module.exports = router;