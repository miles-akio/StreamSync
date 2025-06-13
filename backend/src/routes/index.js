const express = require("express");
const router = express.Router();

router.get("/api/status", (req, res) => {
  res.json({ status: "Backend API is running" });
});

module.exports = router;
