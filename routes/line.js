const express = require("express");
const { handleEventType } = require("../services/line");
const router = express.Router();

router.post("/webhook", (req, res) => {
  req.body.events.forEach(async (event) => handleEventType(event));
});

module.exports = router;
