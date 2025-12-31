const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// ajouter réservation
router.post("/ajouter", reservationController.ajouterReservation);

// lister réservations
router.get("/", reservationController.listerReservations);

module.exports = router;
