const Feedback = require('../Models/feedbackModel');

const feedbackController = {
  // Add feedback
  addFeedback: async (req, res) => {
    try {
      const { content, rating } = req.body;
      const userId = req.session.userId; // Assuming user ID is stored in the session

      const feedback = new Feedback({ userId, content, rating });
      await feedback.save();

      res.status(201).json({ message: 'Feedback added successfully', feedback });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get all feedback
  getAllFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.find().populate('userId', 'username');
      res.status(200).json(feedback);
    } catch (error) {
      console.error('Error getting feedback:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  
};

module.exports = feedbackController;
