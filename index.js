const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/route');
const http = require('http'); // Use built-in http module
const socketIo = require('socket.io');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// User routes ko app ke saath connect karein
app.use('/', route);

// Create HTTP server
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming messages from clients
  socket.on('message', (message) => {
    console.log('Received: %s', message);
    
    // Broadcast message to all clients
    socket.broadcast.emit('message', message);
  });

   // Handle typing status updates from clients
   socket.on('typingStatus', (typingStatus) => {
    console.log('Typing status update received:', typingStatus);

    // Broadcast typing status update to all clients except the sender
    socket.broadcast.emit('typingStatus', typingStatus);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log(`Server running on port 3100`);
});
