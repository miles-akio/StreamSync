const WebSocket = require("ws");
const { consumer } = require("./kafka/kafkaConfig");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");
  ws.send(JSON.stringify({ message: "Connected to WebSocket" }));
});

// Broadcast Kafka messages to all connected WebSocket clients
async function startKafkaConsumer() {
  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = message.value.toString();
      console.log("Broadcasting message to WebSocket clients:", data);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    },
  });
}

startKafkaConsumer().catch(console.error);

console.log("WebSocket server running on port 8080");

module.exports = wss;
