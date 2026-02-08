// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    babysitterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    conversationId: {
      type: String,
      required: true, // parentId_babysitterId
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
