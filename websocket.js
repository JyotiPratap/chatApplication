// WebSocket ko import karein
const WebSocket = require('ws');

// WebSocket server ka URL
const webSocketServerURL = 'ws://localhost:3100';

// WebSocket connection establish karein
const ws = new WebSocket(webSocketServerURL);

// WebSocket connection open hone par
ws.on('open', function open() {
  console.log('Connected to WebSocket server');

  // Koi message WebSocket server pe bhejein
  ws.send('Hello from WebSocket client!');
});

// WebSocket server se message receive hone par
ws.on('message', function incoming(message) {
  console.log('Received message from WebSocket server:', message);
});
// WebSocket connection close karne par
ws.on('close', function close() {
    console.log('Disconnected from WebSocket server');
  });