const Cart = require('../Models/cartModel');
const SavedCart = require('../Models/savedCartModel');
const Book = require('../Models/bookModel');

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session
  
      const book = await Book.findById(productId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Check if the book is already in the cart, if yes, update the quantity
      let cartItem = await Cart.findOne({ userId, 'items.productId': productId });
      if (cartItem) {
        // Update quantity of existing item
        const index = cartItem.items.findIndex(item => item.productId.equals(productId));
        cartItem.items[index].quantity += quantity;
      } else {
        // Create new cart item
        cartItem = new Cart({ userId, items: [{ productId, quantity }] });
      }
  
      await cartItem.save();
  
      res.status(200).json({ message: 'Book added to cart successfully' });
    } catch (error) {
      console.error('Error adding book to cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  



  updateQuantity: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const cartItem = await Cart.findOneAndUpdate(
        { userId, productId },
        { quantity },
        { new: true }
      );
      if (!cartItem) {
        return res.status(404).json({ error: 'Book not found in cart' });
      }

      res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },



  clearCart: async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming user ID is stored in the session

      await Cart.deleteMany({ userId });
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },


  saveCart: async (req, res) => {
    try {
      const userId = req.session.userId;

      // Find the current cart items for the user
      const cartItems = await Cart.find({ userId }).populate('items.productId');

      // Check if cartItems exist
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      // Extract productId and quantity from each item in the cart
      const itemsToSave = cartItems.map(item => ({
        productId: item.items[0].productId._id, // Extract the productId from the populated item
        quantity: item.items[0].quantity
      }));

      // Save the cart items to the SavedCart collection
      const savedCart = new SavedCart({ userId, cartItems: itemsToSave });
      await savedCart.save();

      // Clear the user's current cart
      await Cart.deleteMany({ userId });

      res.status(200).json({ message: 'Cart saved successfully' });
    } catch (error) {
      console.error('Error saving cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
 
};

module.exports = cartController;