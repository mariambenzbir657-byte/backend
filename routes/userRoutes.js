const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
router.post("/ajouter", userController.ajouterUtilisateur);
router.post("/login", userController.login);
router.get("/", userController.listerUtilisateurs);


module.exports = router;
