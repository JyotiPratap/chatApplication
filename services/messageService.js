const Message = require('../model/messageModel');

async function sendMessage(messageData) {
    try {
        const { sender_id, receiver_id, message } = messageData;
        // Create a new message
        await Message.create({ sender_id, receiver_id, message });
        return { status: 200, message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error sending message:', error);
        return { status: 500, message: 'Internal server error' };
    }
}

module.exports = { sendMessage };