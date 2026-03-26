const Enfant = require("../models/Enfant");
const Reservation = require("../models/Reservation");

// ➕ Ajouter réservation (Parent seulement)
exports.ajouterReservation = async (req, res) => {
  try {
    const {
      parentId,
      babySitterId,
      serviceId,
      dateHeureDebut,
      dateHeureFin,
      statut,
      enfant // 🔥 object جاي من frontend
    } = req.body;

    // ✅ 1. إنشاء enfant
    const newEnfant = await Enfant.create({
      nom: enfant.nom,
      dateNaissance: enfant.dateNaissance,
      allergies: enfant.allergies,
      besoinsSpeciaux: enfant.besoinsSpeciaux,
      parentId
    });

    // ✅ 2. إنشاء réservation وربطها بالطفل
    const reservation = await Reservation.create({
      parentId,
      babySitterId,
      serviceId,
      dateHeureDebut,
      dateHeureFin,
      statut,
      enfantId: newEnfant._id
    });

    res.status(201).json({ reservation });

  } catch (err) {
    console.error("Erreur ajout réservation:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 📋 Lister toutes les réservations (Admin ou Parent)
exports.listerReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("parentId", "nom prenom email")
      .populate("babySitterId", "nom prenom email role image")
      .populate("serviceId", "typeService prixParHeure")
      .populate("enfantId", "nom dateNaissance allergies besoinsSpeciaux");
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error: err.message,
    });
  }
};

// ✏️ Modifier réservation par id (Admin ou Parent)
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
      reservation,
    });
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la modification",
      error: err.message,
    });
  }
};

// ❌ Supprimer réservation par id (Admin ou Parent)
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
      error: err.message,
    });
  }
};

// 🍼 Récupérer babysitters pour un parent
exports.getBabysittersForParent = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      parentId: req.params.parentId
    }).populate("babySitterId", "nom prenom email role image"); 

    const babysitters = [];
    const ids = new Set();
    reservations.forEach(r => {
      if (r.babySitterId && !ids.has(r.babySitterId._id.toString())) {
        ids.add(r.babySitterId._id.toString());
        babysitters.push(r.babySitterId);
      }
    });

    res.json(babysitters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 👨‍👩‍👧‍👦 Récupérer parents pour un babysitter
exports.getParentsForBabysitter = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      babySitterId: req.params.id
    }).populate("parentId", "nom prenom email role image");

    const parents = [];
    const ids = new Set();

    reservations.forEach(r => {
      if (r.parentId && !ids.has(r.parentId._id.toString())) {
        ids.add(r.parentId._id.toString());
        parents.push(r.parentId);
      }
    });

    res.json(parents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getReservationsForBabysitter = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      babySitterId: req.params.id
    })
    .populate("parentId", "nom prenom email image role")
    .populate("babySitterId", "nom prenom email image role")
    .populate("serviceId", "typeService prixParHeure")
    .populate("enfantId", "nom dateNaissance allergies besoinsSpeciaux");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};