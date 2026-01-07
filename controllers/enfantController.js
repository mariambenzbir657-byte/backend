const Enfant = require("../models/Enfant");

// ➕ Ajouter un enfant
exports.ajouterEnfant = async (req, res) => {
  try {
    const enfant = new Enfant(req.body);
    const savedEnfant = await enfant.save();
    res.status(201).json(savedEnfant);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'enfant",
      error: error.message,
    });
  }
};

// 📄 Lister tous les enfants
exports.listerEnfants = async (req, res) => {
  try {
    const enfants = await Enfant.find().populate("parent");
    res.status(200).json(enfants);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des enfants",
      error: error.message,
    });
  }
};

// 🔍 Get enfant by ID
exports.getEnfantById = async (req, res) => {
  try {
    const enfant = await Enfant.findById(req.params.id).populate("parent");
    if (!enfant) {
      return res.status(404).json({ message: "Enfant non trouvé" });
    }
    res.status(200).json(enfant);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'enfant",
      error: error.message,
    });
  }
};

// ✏️ Modifier un enfant
exports.modifierEnfant = async (req, res) => {
  try {
    const enfant = await Enfant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!enfant) {
      return res.status(404).json({ message: "Enfant non trouvé" });
    }
    res.status(200).json(enfant);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification de l'enfant",
      error: error.message,
    });
  }
};

// ❌ Supprimer un enfant
exports.supprimerEnfant = async (req, res) => {
  try {
    const enfant = await Enfant.findByIdAndDelete(req.params.id);
    if (!enfant) {
      return res.status(404).json({ message: "Enfant non trouvé" });
    }
    res.status(200).json({ message: "Enfant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'enfant",
      error: error.message,
    });
  }
};
