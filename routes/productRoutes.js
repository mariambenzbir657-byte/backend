const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products?page=1&limit=10&serviceId=...
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, serviceId } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (serviceId) {
      filter.service = serviceId; 
    }

    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(filter);

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
