const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Ajouter service (babySitter seulement)
router.post("/ajouter", protect, authorize(["babySitter"]), serviceController.ajouterService);

// Get all services (tout le monde peut voir)
router.get("/", serviceController.getAllServices);

// Get services d’un babysitter (babySitter seulement)
router.get(
  "/babysitter/:id",
  protect,
  authorize(["babySitter"]),
  serviceController.getServicesByBabySitter
);

// Delete service (babySitter seulement)
router.delete(
  "/:id",
  protect,
  authorize(["babySitter"]),
  serviceController.deleteService
);

module.exports = router;
