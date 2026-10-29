const express = require("express");

const {
  sendMessage,
  getChat,
  clearChat,
} = require("../controllers/careerChatController");

const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Send career message
router.post("/", authMiddleware, sendMessage);

// Get conversation history
router.get("/", authMiddleware, getChat);

// Clear conversation history
router.delete("/", authMiddleware, clearChat);

module.exports = router;