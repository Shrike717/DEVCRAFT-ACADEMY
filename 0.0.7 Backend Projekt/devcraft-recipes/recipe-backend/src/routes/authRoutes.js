const {signupUser, loginUser} = require('../controller/authController');

const express = require('express');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

module.exports = router;
