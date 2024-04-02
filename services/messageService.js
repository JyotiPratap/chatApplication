const Message = require('../model/messageModel');
const User = require('../model/userModel');

async function sendMessage(messageData) {
    try {
        const { sender_id, receiver_id, message } = messageData;
        // Check if sender_id and receiver_id exist in the database
        const senderExists = await User.findByPk(sender_id);
        const receiverExists = await User.findByPk(receiver_id);
        if (!senderExists || !receiverExists) {
            throw { status: 400, message: 'Sender ID or receiver ID does not exist.' };
        }
        // Create a new message
        await Message.create({ sender_id, receiver_id, message });
        return { status: 200, message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error sending message:', error);
        return { status: error.status || 500, message: error.message || 'Internal server error' };
    }
}

async function getMessages(userId) {
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            throw { status: 404, message: 'User not found.' };
        }
        const messages = await Message.findAll({ where: { receiver_id: userId } });
        return messages;
    } catch (error) {
        console.error('Error retrieving messages:', error);
        throw { status: 500, message: 'Internal server error' };
    }
}

async function getChatHistory(userId) {
    try {
        // Check if the user exists
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            throw { status: 404, message: 'User not found.' };
        }

        // Fetch chat history for the user
        const chatHistory = await Message.findAll({
            where: {
                [Op.or]: [{ sender_id: userId }, { receiver_id: userId }]
            }
        });

        return chatHistory;
    } catch (error) {
        console.error('Error getting chat history:', error);
        throw { status: error.status || 500, message: error.message || 'Internal server error' };
    }
}


async function updateTypingStatus() {
    try {
        // Emit typing status to other users using Socket.io
        return { status: 200, message: 'Typing status updated successfully' };
    } catch (error) {
        console.error('Error updating typing status:', error);
        throw { status: 500, message: 'Internal server error' };
    }
}

module.exports = {
    sendMessage,
    getMessages,
    getChatHistory,
    updateTypingStatus
};
