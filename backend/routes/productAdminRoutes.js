const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @acess Private/Admin
router.get("/", protect,admin,async (req,res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");  
    }
});

// @route POST /api/admin/products
// @desc Create a new product (Admin only)
// @access Private/Admin
router.post("/products", protect, admin, async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Server error while creating product" });
    }
  });
  

// @route PUT /api/admin/products/:id
// @desc Update a product (Admin only)
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
      const productId = req.params.id;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Update product fields
      Object.assign(product, req.body);
  
      const updatedProduct = await product.save();
  
      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/products/:id", protect, admin, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      await product.remove();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;