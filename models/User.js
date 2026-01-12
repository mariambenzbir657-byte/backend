const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: { type: String, unique: true, required: true },
    mdp: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "Parent", "BabySitter"],
      default: "Parent",
    },
    adresse: {
      type: String,
      required: function () {
        console.log("Role in adresse validation:", this.role);
        return this.role === "Parent";
      },
    },    
    qualifications: {
      type: String,
      required: function () {
        return this.role === "BabySitter";
      },
    },

    estVerifie: {
      type: Boolean,
      required: function () {
        return this.role === "BabySitter";
      },
    },

    disponibilites: {
      type: String,
      required: function () {
        return this.role === "BabySitter";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
