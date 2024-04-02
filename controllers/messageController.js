const messageService = require('../services/messageService');
const { sendMessageOverWebSocket } = require('../utils/websocketUtils');


async function sendMessage(req, res) {
    try {
        const { sender_id, receiver_id, message } = req.body;
        if (!sender_id || !receiver_id || !message) {
            throw { status: 400, message: 'Sender ID, receiver ID, and message are required.' };
        }

        const sendMessageResponse = await messageService.sendMessage({ sender_id, receiver_id, message });  

        await sendMessageOverWebSocket(sender_id, receiver_id, message);

        res.status(sendMessageResponse.status).json({ message: sendMessageResponse.message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

async function getMessages(req, res) {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            throw { status: 400, message: 'User ID is required.' };
        }

        const messages = await messageService.getMessages(userId);
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

async function getChatHistory(req, res) {
    try {
        const userId = req.params.userId;

        // Validate user ID
        if (!userId) {
            throw { status: 400, message: 'User ID is required.' };
        }

        const chatHistory = await messageService.getChatHistory(userId);
        res.status(200).json({ chatHistory });
    } catch (error) {
        console.error('Error getting chat history:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

async function updateTypingStatus(req, res) {
    try {
        const { userId, isTyping } = req.body;
        if (!userId || !isTyping) {
            throw { status: 400, message: 'User ID and typing status are required.' };
        }

        // Call service function to update typing status
        const updateTypingStatusResponse = await typingService.updateTypingStatus(userId, isTyping);
        res.status(updateTypingStatusResponse.status).json({ message: updateTypingStatusResponse.message });
    } catch (error) {
        console.error('Error updating typing status:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

module.exports = {
    sendMessage,
    getMessages,
    getChatHistory,
    updateTypingStatus
};