const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('Connected to WebSocket server.');
  
  ws.send('Hello, WebSocket server!');
});

ws.on('message', function incoming(data) {
  console.log('Received from server:', data);
});

ws.on('close', function close() {
  console.log('Disconnected from WebSocket server.');
});
