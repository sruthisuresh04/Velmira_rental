const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  saveMessage,
  getMessages,
} = require("../controllers/contactController");

router.post("/send", saveMessage);
router.get("/list", adminAuth, getMessages);

module.exports = router;
