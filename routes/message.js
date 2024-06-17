const express = require('express');

const messageController = require('../controllers/message');

const auth = require("../middlewares/auth");

const router = express.Router();

router.post('/send-message', auth.checkAuth, messageController.sendMessage);


module.exports = router;