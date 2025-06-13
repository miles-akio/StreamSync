const streamModel = require("../models/streamModel");

async function getStreams(req, res) {
  try {
    const streams = await streamModel.getStreams();
    res.json(streams);
  } catch (error) {
    console.error("Error getting streams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getStreamData(req, res) {
  const streamId = parseInt(req.params.id, 10);
  if (isNaN(streamId)) {
    return res.status(400).json({ error: "Invalid stream ID" });
  }
  try {
    const data = await streamModel.getStreamData(streamId);
    res.json(data);
  } catch (error) {
    console.error("Error getting stream data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addStream(req, res) {
  const { stream_name } = req.body;
  if (!stream_name) {
    return res.status(400).json({ error: "Missing stream_name" });
  }
  try {
    const newStream = await streamModel.addStream(stream_name);
    res.status(201).json(newStream);
  } catch (error) {
    console.error("Error adding stream:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addStreamData(req, res) {
  const streamId = parseInt(req.params.id, 10);
  const { data } = req.body;
  if (isNaN(streamId) || !data) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const newData = await streamModel.addStreamData(streamId, data);
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error adding stream data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getStreams,
  getStreamData,
  addStream,
  addStreamData,
};
