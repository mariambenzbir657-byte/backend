// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // lire le body JSON
app.use(cors()); // autoriser les requêtes externes

// Connexion BDD
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/paiement", require("./routes/paiementRoutes"));
app.use("/api/enfant", require("./routes/enfantRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
// Lancer le serveur
const PORT = process.env.PORT || 4000;
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
