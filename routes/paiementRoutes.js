const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");

// ➕ ajouter
router.post("/ajouter", paiementController.ajouterPaiement);

// 📋 lister
router.get("/", paiementController.listerPaiements);

// ✅ by paiementId
router.get("/by-id/:id", paiementController.getPaiementById);

// ✅ by reservationId
router.get("/by-reservation/:id", paiementController.getPaiementByReservation);

// ✏️ modifier
router.put("/modifier/:id", paiementController.modifierPaiement);
// ❌ supprimer
router.delete("/supprimer/:id", paiementController.supprimerPaiement);
router.post("/payer/:id", paiementController.payerPaiement);

module.exports = router;