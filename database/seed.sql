-- Sample data for StreamSync

INSERT INTO streams (stream_name) VALUES ('Test Stream 1');

INSERT INTO stream_data (stream_id, data, timestamp) VALUES
  (1, '{"value": 100, "status": "ok"}', NOW()),
  (1, '{"value": 105, "status": "ok"}', NOW()),
  (1, '{"value": 110, "status": "ok"}', NOW());
