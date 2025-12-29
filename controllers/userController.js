// controllers/userController.js
const User = require("./models/User.js");
// Ajouter un utilisateur (admin uniquement)
exports.ajouterUtilisateur = async (req, res) => {
  try {
    const nouvelUser = new User(req.body);
    await nouvelUser.save();
    res.status(201).json(nouvelUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur d’ajout", error: err.message });
  }
};
// Récupérer tous les utilisateurs
exports.listerUtilisateurs = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
