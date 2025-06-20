const express = require("express");
const cors = require("cors");
const { setupKafka } = require("./kafka/kafkaConfig");
const routes = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kafka setup
setupKafka().catch(console.error);

app.use(routes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
