const Message = require("../models/Message");
const User = require("../models/User");

// Envoyer un message
exports.envoyerMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) return res.status(404).json({ message: "Utilisateur introuvable" });

    // Vérifier rôle parent ↔ babysitter
    if (
      (sender.role === "parent" && receiver.role !== "babysitter") ||
      (sender.role === "babysitter" && receiver.role !== "parent")
    ) {
      return res.status(403).json({ message: "Impossible d'envoyer le message" });
    }

    // Créer conversationId unique
    const conversationId =
      senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;

    const message = new Message({
      parentId: sender.role === "parent" ? senderId : receiverId,
      babysitterId: sender.role === "babysitter" ? senderId : receiverId,
      content,
      conversationId,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les messages d'une conversation
exports.getConversation = async (req, res) => {
  try {
    const { parentId, babysitterId } = req.params;

    const messages = await Message.find({ parentId, babysitterId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
