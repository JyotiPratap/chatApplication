// route.js
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController"); 



router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/send-message', messageController.sendMessage); // New route for sending messages


module.exports = router;
