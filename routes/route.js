// route.js
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController"); 



router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/send-message', messageController.sendMessage);
router.get('/messages/:user_id', messageController.getMessages);
router.get('/history/:userId', messageController.getChatHistory);
router.post('/typing', messageController.updateTypingStatus);



module.exports = router;
