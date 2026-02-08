const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, 
});

module.exports = mongoose.model("Product", productSchema);
