const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * =========================================
 * POST /api/products - Create a new product
 * Private/Admin
 * =========================================
 */
router.post("/", protect, admin, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: req.user._id,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================================
 * GET /api/products/new-arrival - Latest 8 products
 * Public
 * =========================================
 */
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * =========================================
 * GET /api/products/best-seller - Highest rated product
 * Public
 * =========================================
 */
router.get("/best-seller", async (req, res) => {
  try {
    // Prevent caching
    res.set("Cache-Control", "no-store");
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) return res.status(404).json({ message: "No best seller found" });
    res.json(bestSeller);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================================
 * GET /api/products/similar/:id - Similar products
 * Public
 * =========================================
 */
router.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================================
 * GET /api/products - All products with filters
 * Public
 * =========================================
 */
router.get("/", async (req, res) => {
  try {
    const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;

    let query = {};

    if (collection && collection.toLowerCase() !== "all") query.collections = collection;
    if (category && category.toLowerCase() !== "all") query.category = category;
    if (material) query.material = { $in: material.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (size) query.sizes = { $in: size.split(",") };
    if (color) query.colors = { $in: color.split(",") };
    if (gender) query.gender = gender;
    if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
    if (search) query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];

    let sort = {};
    switch (sortBy) {
      case "priceAsc": sort = { price: 1 }; break;
      case "priceDesc": sort = { price: -1 }; break;
      case "popularity": sort = { rating: -1 }; break;
    }

    const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================================
 * GET /api/products/:id - Single product
 * Public
 * =========================================
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================================
 * PUT /api/products/:id - Update product
 * Private/Admin
 * =========================================
 */
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) product[key] = req.body[key];
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================================
 * DELETE /api/products/:id - Delete product
 * Private/Admin
 * =========================================
 */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;