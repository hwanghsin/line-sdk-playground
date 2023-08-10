const express = require("express");
const router = express.Router();

router.post("/webhook", (req, res) => {
  req.body.events.forEach((event) => {
    console.log("event", event);
  });
});

module.exports = router;
