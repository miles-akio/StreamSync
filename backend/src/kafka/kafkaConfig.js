const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "streamsync",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: "streamsync-group" });

async function waitForKafkaReady(retries = 10, delayMs = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await producer.connect();
      await consumer.connect();
      console.log("Kafka producer and consumer connected.");
      return;
    } catch (error) {
      console.error(`Kafka connection attempt ${i + 1} failed. Retrying in ${delayMs}ms...`, error.message);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("Failed to connect to Kafka after multiple attempts.");
}

async function setupKafka() {
  await waitForKafkaReady();

  // Create topic if it doesn't exist
  const admin = kafka.admin();
  await admin.connect();
  const topics = await admin.listTopics();
  if (!topics.includes("stream_topic")) {
    await admin.createTopics({
      topics: [{ topic: "stream_topic", numPartitions: 1, replicationFactor: 1 }],
    });
    console.log("Created topic 'stream_topic'");
  }
  await admin.disconnect();

  await consumer.subscribe({ topic: "stream_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      // Here you can add processing logic or forward to WebSocket clients
    },
  });

  console.log("Kafka consumer is running.");
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
