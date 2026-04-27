const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ➕ ajouter
router.post("/ajouter",protect,authorize(["Parent"]), paiementController.ajouterPaiement);

// 📋 lister
router.get("/",protect,authorize(["Parent"]), paiementController.listerPaiements);

// ✅ by paiementId
router.get("/by-id/:id", paiementController.getPaiementById);

// ✅ by reservationId
router.get("/by-reservation/:id",paiementController.getPaiementByReservation);

// ✏️ modifier
router.put("/modifier/:id", protect,authorize(["Parent"]), paiementController.modifierPaiement);
// ❌ supprimer
router.delete("/supprimer/:id", protect,authorize(["Parent"]), paiementController.supprimerPaiement);
router.post("/payer/:id", protect,authorize(["Parent"]),paiementController.payerPaiement);

module.exports = router;