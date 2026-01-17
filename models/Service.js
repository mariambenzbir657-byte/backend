const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  typeService: {
    type: String,
    required: true
  },
  prixParHeure: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  idBabySitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);