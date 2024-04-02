const Message = require('../model/messageModel');
const User = require('../model/userModel');
const { Op } = require('sequelize');


async function sendMessage(messageData) {
    const { sender_id, receiver_id, message } = messageData;
    const senderExists = await User.findByPk(sender_id);
    const receiverExists = await User.findByPk(receiver_id);
    if (!senderExists || !receiverExists) {
        return { status: 400, message: 'Sender ID or receiver ID does not exist.' };
    }
    await Message.create({ sender_id, receiver_id, message });
    return {
        status: 200, 
        message: 'Message sent successfully',
        sender_id,
        receiver_id,
        message
    }
}



async function getMessages(userId) {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
        return { status: 404, message: 'User not found.' };
    }
    const messages = await Message.findAll({ where: { receiver_id: userId } });
    return messages;
}



async function getChatHistory(userId) {
    const userExists = await User.findByPk(userId);
    if (!userExists) {
        throw { status: 404, message: 'User not found.' };
    }

    const chatHistory = await Message.findAll({
        where: {
            [Op.or]: [
                { sender_id: userId },
                { receiver_id: userId }
            ]
        }
    });

    return chatHistory;
}


async function updateTypingStatus(userId, isTyping) {
    // Check if the user exists in the database
    const userExists = await User.findByPk(userId);
    if (!userExists) {
        throw { status: 404, message: 'User not found.' };
    }

    // If the user exists, return the response with relevant data
    return {
        status: 200,
        message: 'Typing status updated successfully',
        userId,
        isTyping
    };
}



module.exports = {
    sendMessage,
    getMessages,
    getChatHistory,
    updateTypingStatus
};
