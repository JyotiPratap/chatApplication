const webSocketServerURL = 'ws://localhost:3100';
const WebSocket = require('ws');

// WebSocket connection establish karein
const ws = new WebSocket(webSocketServerURL);

function sendMessageOverWebSocket(sender_id, receiver_id, message) {
    // Construct the message object to send over WebSocket
    const messageObject = {
        sender_id,
        receiver_id,
        message
    };

    // Convert the message object to JSON before sending
    const jsonMessage = JSON.stringify(messageObject);

    // Send the JSON message over WebSocket
    ws.send(jsonMessage);
}
module.exports = {
    sendMessageOverWebSocket
};
