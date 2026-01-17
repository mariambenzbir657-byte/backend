const express = require("express");
const router = express.Router();
const enfantController = require("../controllers/enfantController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ➕ Ajouter enfant
router.post("/ajouter",  protect,authorize(["Parent"]),enfantController.ajouterEnfant);

// 📄 Lister enfants
router.get("/",enfantController.listerEnfants);

// 🔍 Get enfant by ID
router.get("/:id", enfantController.getEnfantById);

// ✏️ Modifier enfant
router.put("/:id",enfantController.modifierEnfant);

// ❌ Supprimer enfant
router.delete("/:id",enfantController.supprimerEnfant);

module.exports = router;
