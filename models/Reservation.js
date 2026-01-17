const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true
    },
    babySitterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BabySitter",
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    dateHeureDebut: {
      type: Date,
      required: true
    },
    dateHeureFin: {
      type: Date,
      required: true
    },
    statut: {
      type: String,
      enum: ["en attente", "confirmee", "annulee"],
      default: "en attente"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
