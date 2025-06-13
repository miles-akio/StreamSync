const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "streamsync",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: "streamsync-group" });

async function setupKafka() {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: "stream_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      // Here you can add processing logic or forward to WebSocket clients
    },
  });

  console.log("Kafka producer and consumer are connected and running.");
}

async function sendMessage(data) {
  await producer.send({
    topic: "stream_topic",
    messages: [{ value: JSON.stringify(data) }],
  });
}

module.exports = {
  setupKafka,
  sendMessage,
  consumer,
  producer,
};
