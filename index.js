const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/route');
const WebSocket = require('ws'); // Import the WebSocket module
const sequelize = require('./config/database');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// User routes ko app ke saath connect karein
app.use('/', route);

// WebSocket server ko Express.js server ke saath initialize karein
const wss = new WebSocket.Server({ noServer: true });

// Create HTTP server
const server = app.listen(3100, () => {
  console.log(`Server running on port 3100`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// WebSocket connection handler
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Handle incoming messages from clients
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    
    // Broadcast message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) { // Use 'ws' instead of 'WebSocket'
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
