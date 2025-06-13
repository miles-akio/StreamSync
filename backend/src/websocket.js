const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");
  ws.send(JSON.stringify({ message: "Connected to WebSocket" }));

  // Placeholder for receiving Kafka messages and broadcasting to clients
  // This can be integrated with Kafka consumer later
});

console.log("WebSocket server running on port 8080");

module.exports = wss;
