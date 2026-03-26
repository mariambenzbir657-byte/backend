const mongoose = require("mongoose");
const Message = require("../models/Message");

// جلب الرسائل بين parent و babysitter
exports.getMessages = async (req, res) => {
  try {
    const { parentId, babysitterId } = req.params;

    if (!parentId || !babysitterId) {
      return res.status(400).json({ error: "Missing IDs" });
    }

    if (!mongoose.Types.ObjectId.isValid(parentId) || !mongoose.Types.ObjectId.isValid(babysitterId)) {
      return res.status(400).json({ error: "Invalid IDs" });
    }

    const messages = await Message.find({
      $or: [
        { parentId, babysitterId },
        { parentId: babysitterId, babysitterId: parentId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// إرسال رسالة جديدة
exports.sendMessage = async (req, res) => {
  try {
    const { parentId, babysitterId, content, senderRole } = req.body;

    if (!parentId || !babysitterId || !content || !senderRole) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(parentId) || !mongoose.Types.ObjectId.isValid(babysitterId)) {
      return res.status(400).json({ error: "Invalid IDs" });
    }

    const newMessage = new Message({ parentId, babysitterId, content, senderRole });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Server error" });
  }
};