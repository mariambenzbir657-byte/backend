const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

// ⭐⭐⭐ CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for images
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

// Connexion BDD
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/paiement", require("./routes/paiementRoutes"));
app.use("/api/enfant", require("./routes/enfantRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));

// Test route
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", url: req.originalUrl });
});

// Lancer le serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

