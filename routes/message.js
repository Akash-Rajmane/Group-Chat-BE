const express = require('express');

const messageController = require('../controllers/message');

const auth = require("../middlewares/auth");

const router = express.Router();

router.post('/send-message', auth.checkAuth, messageController.sendMessage);
router.get('/get-all-messages', auth.checkAuth, messageController.getAllMessages);


module.exports = router;