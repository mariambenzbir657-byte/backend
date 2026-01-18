const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

// 🔹 PUBLIC ADD USER (form-data + image)
router.post("/ajouter",upload.single("image"),userController.ajouterUtilisateur);
// 🔹 LOGIN
router.post("/login", userController.login);

// 🔹 LIST USERS (protected admin)
router.get("/", protect, authorize(["admin"]), userController.listerUtilisateurs);

// 🔹 DELETE USER (protected admin)
router.delete("/:id",protect, authorize(["admin"]), userController.deleteUser);

// 🔹 UPDATE USER (protected admin ou owner)
router.put("/modifier/:id",protect,userController.updateUser);
  
module.exports = router;
