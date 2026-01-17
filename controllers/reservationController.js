const Reservation = require("../models/Reservation");

// ➕ Ajouter réservation
exports.ajouterReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({
      message: "Réservation ajoutée avec succès",
      reservation
    });
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de l'ajout de la réservation",
      error: err.message
    });
  }
};

// 📋 Lister toutes les réservations
exports.listerReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("parentId", "nom email")
      .populate("babySitterId", "nom email")
      .populate("serviceId", "typeService prixParHeure");

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error: err.message
    });
  }
};

// 👶 Lister réservations d’un babysitter
exports.reservationsParBabySitter = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      babySitterId: req.params.id
    })
      .populate("parentId", "nom email")
      .populate("serviceId", "typeService prixParHeure");

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: err.message
    });
  }
};

// ✏️ Modifier statut réservation
exports.modifierReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.status(200).json({
      message: "Réservation modifiée",
      reservation
    });
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la modification",
      error: err.message
    });
  }
};

// ❌ Supprimer réservation
exports.supprimerReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.status(200).json({ message: "Réservation supprimée" });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression",
      error: err.message
    });
  }
};
