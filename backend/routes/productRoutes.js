const express = require("express");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const { protect, admin } = require("../middleware/authMiddleware");
const product = require("../models/product");

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      dimensions,
      weight,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      dimensions,
      weight,
      user: req.user._id, // Reference to the admin user who created the product
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/products/:id
// @desc Update an existing product by ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      dimensions,
      weight,
    } = req.body;
    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.rating = rating || product.rating;
      product.numReviews = numReviews || product.numReviews;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
      // Remove the product from database
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
