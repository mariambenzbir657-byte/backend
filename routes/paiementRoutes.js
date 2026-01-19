const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ➕ Ajoute paiement (parent seulement)
router.post("/ajouter",protect,authorize(["Parent"]),paiementController.ajouterPaiement);

//  Lister paiements (admin seulement)
router.get("/",protect,authorize(["Admin","Parent"]),paiementController.listerPaiements);

// ✏️ Modifier paiement (admin seulement)
router.put("/modifier/:id",protect,authorize(["Admin","Parent"]),paiementController.modifierPaiement);

// ❌ Supprimer paiement (admin seulement)
router.delete("/supprimer/:id",protect,authorize(["Admin","Parent"]),paiementController.supprimerPaiement);

module.exports = router;
