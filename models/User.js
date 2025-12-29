const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: { type: String, unique: true,required :true},
    mdp: String,
    role: {
      type: String,
      enum: ["admin", "Parent", "BabySitter"],
      default: "Parent",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
