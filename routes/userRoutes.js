const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload=require("../middleware/upload");
// ➕ Ajouter utilisateur (admin seulement)
router.post("/ajouter",protect,authorize(["admin"]),upload.imageuserController.ajouterUtilisateur);

// 🔐 Login (public)
router.post("/login", userController.login);

// 📋 Lister utilisateurs (admin seulement)
router.get("/",protect,authorize(["admin"]),userController.listerUtilisateurs);

// ❌ Supprimer utilisateur (admin ou parent)
router.delete("/:id",protect,authorize(["admin", "parent"]),userController.deleteUser);

// ✏️ Modifier utilisateur (admin ou propriétaire)
router.put("/modifier/:id",protect,authorize(["admin", "parent", "babySitter"]),userController.updateUser);

module.exports = router;
