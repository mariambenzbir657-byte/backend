const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const protect = require("../middleware/authMiddleware");
const Message = require("../models/Message"); // 🔥 مهم

// Envoyer un message
router.post("/envoyer", protect, messageController.envoyerMessage);

// Récupérer conversation
router.get("/:conversationId", protect, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
