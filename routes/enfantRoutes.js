const express = require("express");
const router = express.Router();
const enfantController = require("../controllers/enfantController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ➕ Ajouter enfant
router.post("/ajouter",protect,authorize(["Parent"]),enfantController.ajouterEnfant);

// 📄 Lister enfants
router.get("/",protect,authorize(["Parent"]),enfantController.listerEnfants);

// 🔍 Get enfant by ID
router.get("/:id",protect,authorize(["Parent"]), enfantController.getEnfantById);

// ✏️ Modifier enfant
router.put("/:id",protect,authorize(["Parent"]),enfantController.modifierEnfant);

// ❌ Supprimer enfant
router.delete("/:id",protect,authorize(["Parent"]),enfantController.supprimerEnfant);

module.exports = router;
