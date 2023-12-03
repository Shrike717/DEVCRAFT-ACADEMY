const express = require('express');
const { validateAuth } = require('../../middleware/validation');

const { signup, login } = require('../controllers/authController');

const router = express.Router();

// TODO: Später die Validation und Authentication Mittelware hinzufügen

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
