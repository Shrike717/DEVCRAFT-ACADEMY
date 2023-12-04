const express = require('express');
const {
	validateUserSignup,
	validateUserLogin,
} = require('../../middleware/validation');

const { signupUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// TODO: Später die Validation und Authentication Mittelware hinzufügen

router.post('/signup', validateUserSignup, signupUser);
router.post('/login', validateUserLogin, loginUser);

module.exports = router;
