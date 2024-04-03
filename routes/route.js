// route.js
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController"); 
const { userAuth } = require('../middleware/authMiddleware');




router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/send-message',userAuth, messageController.sendMessage);
router.get('/messages',userAuth, messageController.getMessages);
router.get('/history',userAuth, messageController.getChatHistory);
router.post('/typing',userAuth, messageController.updateTypingStatus);



module.exports = router;
