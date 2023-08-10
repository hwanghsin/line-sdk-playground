const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Line SDK 測試網站");
});

module.exports = router;
