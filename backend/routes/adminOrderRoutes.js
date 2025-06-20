const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @acess Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status (Admin only)
// @acess Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
            const updateOrder = await order.save();
            res.json(updateOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete a order (Admin only)
// @acess Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order removed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;