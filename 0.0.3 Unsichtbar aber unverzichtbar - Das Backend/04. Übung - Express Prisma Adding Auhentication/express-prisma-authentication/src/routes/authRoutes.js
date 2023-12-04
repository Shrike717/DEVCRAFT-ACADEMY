const express = require('express');
const { validateUser } = require('../../middleware/validation');

const { signupUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// TODO: Später die Validation und Authentication Mittelware hinzufügen

router.post('/signup', validateUser, signupUser);
router.post('/login', validateUser, loginUser);

module.exports = router;
