const Paiement = require("../models/Paiement");

// Ajouter un paiement
exports.ajouterPaiement = async (req, res) => {
  try {
    const { reservationId, montant, datePaiement, modePaiement } = req.body;

    const paiement = new Paiement({
      reservationId,
      montant,
      datePaiement,
      modePaiement,
    });

    const savedPaiement = await paiement.save();
    res.status(201).json(savedPaiement);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du paiement", error });
  }
};

// Lister tous les paiements
exports.listerPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find().populate("reservationId");
    res.status(200).json(paiements);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des paiements", error });
  }
};
// Modifier un paiement
exports.modifierPaiement = async (req, res) => {
  try {
    const paiementId = req.params.id;
    const dataUpdate = req.body;

    const paiementModifie = await Paiement.findByIdAndUpdate(paiementId, dataUpdate, { new: true });

    if (!paiementModifie) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json(paiementModifie);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
  }
};

// Supprimer un paiement
exports.supprimerPaiement = async (req, res) => {
  try {
    const paiementId = req.params.id;
    const paiementSupprime = await Paiement.findByIdAndDelete(paiementId);

    if (!paiementSupprime) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json({ message: "Paiement supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};