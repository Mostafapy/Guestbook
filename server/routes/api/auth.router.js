const express = require('express');


/** Controllers */
const { userRegistration, login } = require('./../../controllers/auth.controller');

const router = express.Router();

router.post('/register', userRegistration);

router.post('/login', login);

module.exports = router;