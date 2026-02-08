// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ➕ Send message
router.post("/", async (req, res) => {
  try {
    const { parentId, babysitterId, content } = req.body;

    const conversationId =
      parentId < babysitterId
        ? `${parentId}_${babysitterId}`
        : `${babysitterId}_${parentId}`;

    const message = new Message({
      parenntId,
      babysitterId,
      content,
      conversationId,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📥 Get messages between parent & babysitter
router.get("/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const conversationId =
      user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;

    const messages = await Message.find({ conversationId })
      .populate("parenntId", "name role")
      .populate("babysitterId", "name role")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
