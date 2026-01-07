const express = require("express");
const router = express.Router();
const enfantController = require("../controllers/enfantController");

// ➕ Ajouter enfant
router.post("/ajouter", enfantController.ajouterEnfant);

// 📄 Lister enfants
router.get("/", enfantController.listerEnfants);

// 🔍 Get enfant by ID
router.get("/:id", enfantController.getEnfantById);

// ✏️ Modifier enfant
router.put("/:id", enfantController.modifierEnfant);

// ❌ Supprimer enfant
router.delete("/:id", enfantController.supprimerEnfant);

module.exports = router;
