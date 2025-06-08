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
        console.log(error);
        res.status(500).send("Server Error");  
    }
});

module.exports = router;