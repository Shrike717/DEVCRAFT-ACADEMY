const express = require('express');
const { validateAuth } = require('../../middleware/validation');

const { signupUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// TODO: Später die Validation und Authentication Mittelware hinzufügen

router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;
