const pool = require('../../database/db'); // Assuming a db.js exports a configured pg Pool

async function getStreams() {
  const result = await pool.query('SELECT * FROM streams ORDER BY id');
  return result.rows;
}

async function getStreamData(streamId) {
  const result = await pool.query(
    'SELECT * FROM stream_data WHERE stream_id = $1 ORDER BY timestamp DESC',
    [streamId]
  );
  return result.rows;
}

async function addStream(streamName) {
  const result = await pool.query(
    'INSERT INTO streams (stream_name) VALUES ($1) RETURNING *',
    [streamName]
  );
  return result.rows[0];
}

async function addStreamData(streamId, data) {
  const result = await pool.query(
    'INSERT INTO stream_data (stream_id, data) VALUES ($1, $2) RETURNING *',
    [streamId, data]
  );
  return result.rows[0];
}

module.exports = {
  getStreams,
  getStreamData,
  addStream,
  addStreamData,
};
