const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const Reservation = require("../models/Reservation");
const mongoose = require("mongoose");  



// ajouter réservation
router.post("/ajouter",protect,authorize(["Parent"]),reservationController.ajouterReservation);

// lister réservations
router.get("/",protect,authorize(["Parent"]),reservationController.listerReservations);

// Modifier une réservation par id
router.put("/modifier/:id",protect,authorize(["Parent"]),reservationController.modifierReservation);

// Supprimer une réservation par id
router.delete("/supprimer/:id",protect,authorize(["Admin","Parent"]),reservationController.supprimerReservation);

router.get("/parent/:id", async (req, res) => {
    try {
      const parentId = new mongoose.Types.ObjectId(req.params.id);   
      const reservations = await Reservation.find({ parentId })
      .populate("babySitterId", "nom prenom email image")
      .populate("serviceId", "nom prix")
      .populate("parentId", "nom prenom email image")
      .populate("enfantId", "nom dateNaissance allergies besoinsSpeciaux"); // 🔥 مهم
      console.log("RESERVATIONS:", reservations);
  
      res.json(reservations);
    } catch (err) {
      console.error("ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
  
  router.get("/babysitter/:id", reservationController.getReservationsForBabysitter);
  module.exports = router;
