// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/**
 * ➕ Ajouter un utilisateur (admin)
 */
exports.ajouterUtilisateur = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { nom, prenom, email, mdp, role,adresse,qualifications,estVerifie,disponibilites } = req.body;

    // Vérifier si email existe déjà
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash mot de passe
    const hashedmdp = await bcrypt.hash(mdp, 10);

    const nouvelUser = new User({
      nom,
      prenom,
      email,
      mdp: hashedmdp,
      role,
      adresse,
      qualifications,
      estVerifie,
      disponibilites,
      image: req.file ? req.file.filename : null, // 📸 image (comme Cour)
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

/**
 * 🔐 Login utilisateur
 */
 exports.login = async (req, res) => {
  try {
    const { email, mdp } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login réussi",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * 📄 Récupérer tous les utilisateurs
 */
 exports.listerUtilisateurs = async (req, res) => {
  try {
    const { search, role } = req.query;

    let query = {};
    if (role) {
      query.role = { $regex: `^${role}$`, $options: "i" }; 
    }

    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: "i" } },
        { prenom: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).select("-mdp");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * ✏️ Mettre à jour un utilisateur
 */
 exports.updateUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update normal fields
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    // update image only if new one uploaded
    if (req.file) {
      user.image = req.file.filename;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

/**
 * 🗑️ Supprimer un utilisateur (admin)
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
