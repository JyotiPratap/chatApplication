const socketIo = require('socket.io');

let io;

function init(server) {
    io = socketIo(server);
    return io;
}

function getIo() {
    if (!io) {
        throw new Error('Socket.io has not been initialized.');
    }
    return io;
}

module.exports = {
    init,
    getIo
};
