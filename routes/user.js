const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/sign-up', userController.signUpUser);

router.post('/log-in', userController.logInUser);

module.exports = router;