const socket = require('socket.io-client')('http://localhost:3100');

function sendMessageOverSocket(sender_id, receiver_id, message) {

    const messageObject = {
        sender_id,
        receiver_id,
        message
    };

    // Emit the message event with the message object
    socket.emit('message', messageObject);
}
function sendTypingStatusOverSocket(userId, isTyping) {

    const typingStatusObject = {
        userId,
        isTyping
    };

    // Emit the typingStatus event with the typing status object
    socket.emit('typingStatus', typingStatusObject);

}
module.exports = {
    sendMessageOverSocket,
    sendTypingStatusOverSocket
};
