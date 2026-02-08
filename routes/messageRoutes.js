const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* ============================
   ➕ Send Message
   ============================ */
router.post("/", async (req, res) => {
  try {
    const { parentId, babysitterId, content } = req.body;

    if (!parentId || !babysitterId || !content) {
      return res.status(400).json({ message: "Données manquantes" });
    }
    const conversationId =
      parentId < babysitterId
        ? `${parentId}_${babysitterId}`
        : `${babysitterId}_${parentId}`;

    const message = new Message({
      parentId: parentId,
      babysitterId: babysitterId,
      content,
      conversationId,
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/* ============================
   📥 Get messages between
   Parent & BabySitter
   ============================ */
router.get("/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const conversationId =
      user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;

    const messages = await Message.find({ conversationId })
      .populate("parentId", "name role")
      .populate("babysitterId", "name role")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
