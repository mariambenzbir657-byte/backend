const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    babySitterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateHeureDebut: {
      type: Date,
      required: true,
    },
    dateHeureFin: {
      type: Date,
      required: true,
    },
    statut: {
      type: String,
      enum: ["en attente", "confirmée", "annulée"],
      default: "en attente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
