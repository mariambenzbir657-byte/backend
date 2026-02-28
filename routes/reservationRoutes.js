const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ajouter réservation
router.post("/ajouter",reservationController.ajouterReservation);

// lister réservations
router.get("/",reservationController.listerReservations);

// Modifier une réservation par id
router.put("/modifier/:id",protect,reservationController.modifierReservation);

// Supprimer une réservation par id
router.delete("/supprimer/:id",protect,authorize(["Admin","Parent"]),reservationController.supprimerReservation);

router.get("/parent/:parentId", reservationController.getBabysittersForParent);

module.exports = router;
