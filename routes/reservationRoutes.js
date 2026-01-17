const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ajouter réservation
router.post("/ajouter", protect, authorize(["admin", "Parent"]),reservationController.ajouterReservation);

// lister réservations
router.get("/",protect,protect,authorize(["admin"]), reservationController.listerReservations);

// Modifier une réservation par id
router.put("/modifier/:id", protect,authorize(["admin","Parent"]),reservationController.modifierReservation);

// Supprimer une réservation par id
router.delete("/supprimer/:id",protect,authorize(["admin"]), reservationController.supprimerReservation);


module.exports = router;
