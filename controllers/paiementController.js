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
