const Reservation = require("../models/Reservation");

// ➕ ajouter
exports.ajouterReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📄 lister
exports.listerReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("parentId")
      .populate("babySitterId");

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
