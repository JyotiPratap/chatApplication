const messageService = require('../services/messageService');
const { sendMessageOverSocket,sendTypingStatusOverSocket } = require('../utils/socketUtils');


async function sendMessage(req, res) {
    try {
        const { receiver_id, message } = req.body;
        const sender_id = req.userId; // Using authenticated user's ID as sender_id

        if (!receiver_id || !message) {
            throw { status: 400, message: 'Receiver ID and message are required.' };
        }

        const sendMessageResponse = await messageService.sendMessage({ sender_id, receiver_id, message });

        await sendMessageOverSocket(sender_id, receiver_id, message);

        res.status(sendMessageResponse.status).json({
            success_message: 'Message sent successfully',
            data: {
                sender_id: sendMessageResponse.sender_id,
                receiver_id: sendMessageResponse.receiver_id,
                message: sendMessageResponse.message
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}


async function getMessages(req, res) {
    try {
        const userId = req.userId; // Authenticated user's ID
        const messages = await messageService.getMessages(userId);
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}


async function getChatHistory(req, res) {
    try {
        const userId = req.userId; // Authenticated user's ID

        const chatHistory = await messageService.getChatHistory(userId);
        res.status(200).json({ chatHistory });
    } catch (error) {
        console.error('Error getting chat history:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

async function updateTypingStatus(req, res) {
    try {
        const userId = req.userId;

        const { isTyping } = req.body;
        if (!isTyping) {
            throw { status: 400, message: 'User ID and typing status are required.' };
        }
        const updateTypingStatusResponse = await messageService.updateTypingStatus(userId, isTyping);
        const { message, userId: updatedUserId, isTyping: updatedIsTyping } = updateTypingStatusResponse;

        await sendTypingStatusOverSocket(userId, isTyping);

        res.status(updateTypingStatusResponse.status).json({
            message,
            userId: updatedUserId,
            isTyping: updatedIsTyping
        });
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