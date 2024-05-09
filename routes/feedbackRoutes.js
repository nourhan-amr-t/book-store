const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Add feedback
router.post('/', feedbackController.addFeedback);

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
