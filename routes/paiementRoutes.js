const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");

// Ajouter un paiement
router.post("/ajouter", paiementController.ajouterPaiement);

// Lister tous les paiements
router.get("/", paiementController.listerPaiements);

module.exports = router;
