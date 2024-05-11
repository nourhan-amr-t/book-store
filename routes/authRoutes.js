const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
<<<<<<< Updated upstream
router.post('/logged', authController.logged);
=======
router.get('/isLogged', authController.isLogged);
>>>>>>> Stashed changes

module.exports = router;
