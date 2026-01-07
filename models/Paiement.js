const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation", 
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  datePaiement: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modePaiement: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Paiement || mongoose.model("Paiement", paiementSchema);
