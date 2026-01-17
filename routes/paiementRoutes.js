const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ➕ Ajoute paiement (parent seulement)
router.post("/ajouter",protect,authorize(["parent"]),paiementController.ajouterPaiement);

//  Lister paiements (admin seulement)
router.get("/",paiementController.listerPaiements);

// ✏️ Modifier paiement (admin seulement)
router.put("/modifier/:id",paiementController.modifierPaiement);

// ❌ Supprimer paiement (admin seulement)
router.delete("/supprimer/:id",paiementController.supprimerPaiement);

module.exports = router;
