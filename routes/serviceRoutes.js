const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ➕ Ajouter service (BabySitter seulement)
router.post("/ajouter",protect,authorize(["BabySitter"]),serviceController.ajouterService);

// 📄 Get all services (public)
router.get("/", serviceController.getAllServices);

// 📄 Get services d’un babysitter (owner ou admin)
router.get("/babysitter/:id",protect,authorize(["BabySitter", "Admin"]),serviceController.getServicesByBabySitter);

// ✏️ Modifier service (owner ou admin)
router.put("/modifier/:id",protect,authorize(["BabySitter", "Admin"]),serviceController.updateService);

// ❌ Delete service (owner ou admin)
router.delete("/:id",protect,authorize(["BabySitter", "Admin"]),serviceController.deleteService);

module.exports = router;
