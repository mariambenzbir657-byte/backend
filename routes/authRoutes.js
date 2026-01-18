const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/users", protect,authorize(["admin","parent","babySitter"]), (req, res) => {
  res.json({ message: "Profil utilisateur", user: req.user });
});

router.get(
  "/admin",
  protect,
  authorize(["admin"]),
  (req, res) => {
    res.json({ message: "Espace administrateur" });
  }
  
);
// test route
router.get("/test", (req, res) => {
  res.send("AUTH ROUTE OK");
});

module.exports = router;
