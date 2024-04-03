const Message = require('../model/messageModel');
const User = require('../model/userModel');
const { Op } = require('sequelize');


async function sendMessage(messageData) {
    const { sender_id, receiver_id, message } = messageData;

    const senderExists = await User.findByPk(sender_id);
   if (!senderExists) {
       return { status: 400, message: 'Sender ID does not exist.' };
   }

   const receiverExists = await User.findByPk(receiver_id);
   if (!receiverExists) {
       return { status: 400, message: 'Receiver ID does not exist.' };
   }
    await Message.create({ sender_id, receiver_id, message });
    return {
        status: 200,
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
    const userExists = await User.findByPk(userId);

    if (!userExists) {
        throw { status: 404, message: 'User not found.' };
    }
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
