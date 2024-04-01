const messageService = require('../services/messageService');

async function sendMessage(req, res) {
    try {
        const { sender_id, receiver_id, message } = req.body;
        if (!sender_id || !receiver_id || !message) {
            throw { status: 400, message: 'Sender ID, receiver ID, and message are required.' };
        }

        const sendMessageResponse = await messageService.sendMessage({ sender_id, receiver_id, message });
        res.status(sendMessageResponse.status).json({ message: sendMessageResponse.message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
}

module.exports = { sendMessage };