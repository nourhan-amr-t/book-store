const mongoose = require('mongoose');

const ORDERSSSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, default: 1 }
  }],
  createdAt: { type: Date, default: Date.now }
});

const SavedCart = mongoose.model('ORDERSS', ORDERSSSchema);

module.exports = SavedCart;