const mongoose = require("mongoose");
const Paiement = require("../models/Paiement");


// ➕ Ajouter paiement
exports.ajouterPaiement = async (req, res) => {
  try {
    const { reservationId, montant, modePaiement } = req.body;

    if (!reservationId || !montant) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    // 🔹 نتأكد ما فماش paiement déjà
    const exist = await Paiement.findOne({ reservationId });
    if (exist) {
      return res.status(200).json(exist);
    }

    const paiement = new Paiement({
      reservationId,
      montant,
      modePaiement: modePaiement || "non spécifié",
      statut: "non payé",
    });

    const saved = await paiement.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Erreur ajouterPaiement:", error);
    res.status(500).json({
      message: "Erreur ajout paiement",
      error: error.message,
    });
  }
};


// 📋 Lister tous les paiements
exports.listerPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find().populate("reservationId");
    res.status(200).json(paiements);
  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération paiements",
      error: error.message,
    });
  }
};


// ✅ GET paiement par ID
exports.getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findById(req.params.id);

    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json(paiement);
  } catch (error) {
    console.error("Erreur getPaiementById:", error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};


// ✅ GET paiement par reservationId (🔴 FIX هنا)
exports.getPaiementByReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      return res.status(400).json({ message: "reservationId invalide" });
    }

    const paiement = await Paiement.findOne({
      reservationId: new mongoose.Types.ObjectId(reservationId),
    });

    // 🔥 FIX: ما نرجعوش fake data
    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json(paiement);

  } catch (error) {
    console.error("Erreur getPaiementByReservation:", error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};


// ✏️ Modifier paiement
exports.modifierPaiement = async (req, res) => {
  try {
    const paiementId = req.params.id;

    const paiementModifie = await Paiement.findByIdAndUpdate(
      paiementId,
      req.body,
      { new: true }
    );

    if (!paiementModifie) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json(paiementModifie);
  } catch (err) {
    res.status(500).json({
      message: "Erreur modification paiement",
      error: err.message,
    });
  }
};


// ❌ Supprimer paiement
exports.supprimerPaiement = async (req, res) => {
  try {
    const paiementSupprime = await Paiement.findByIdAndDelete(req.params.id);

    if (!paiementSupprime) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json({ message: "Paiement supprimé" });
  } catch (err) {
    res.status(500).json({
      message: "Erreur suppression",
      error: err.message,
    });
  }
};


// 💳 Payer paiement (🔹 أهم function)
exports.payerPaiement = async (req, res) => {
  try {
    const paiementId = req.params.id;

    const paiement = await Paiement.findById(paiementId);

    if (!paiement) {
      return res.status(404).json({ message: "Paiement introuvable" });
    }

    // 🔹 إذا déjà payé ما نعاودوش
    if (paiement.statut === "payé") {
      return res.status(200).json(paiement);
    }

    paiement.statut = "payé";
    paiement.datePaiement = new Date();

    await paiement.save();

    res.status(200).json(paiement);

  } catch (err) {
    console.error("Erreur payerPaiement:", err);
    res.status(500).json({
      message: "Erreur paiement",
      error: err.message,
    });
  }
};