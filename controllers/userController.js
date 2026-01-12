const User = require("../models/User.js");
const bcrypt = require("bcrypt");
// Ajouter un utilisateur (admin)
exports.ajouterUtilisateur = async (req, res) => {
  try {
    const { mdp, email } = req.body;

    // vérifier email déjà existant
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // 🔐 hash du mot de passe
    const hashedPassword = await bcrypt.hash(mdp, 10);

    const nouvelUser = new User({
      ...req.body,
      mdp: hashedPassword,
    });

    await nouvelUser.save();

    res.status(201).json({
      message: "Utilisateur ajouté avec succès",
      user: nouvelUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Erreur d’ajout",
      error: err.message,
    });
  }
};
// Login utilisateur
exports.login = async (req, res) => {
  try {
    const { email, mdp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    res.status(200).json({
      message: "Login réussi",
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
