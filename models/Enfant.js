const mongoose = require("mongoose");

const enfantSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    dateNaissance: Date,
    allergies: String,
    besoinsSpeciaux: String,

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enfant", enfantSchema);