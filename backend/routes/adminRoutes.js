const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const mongoose = require('mongoose');

// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @acess Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route POST /api/admin/users
// @desc Add a new user (Admin only)
// @acess Private/Admin
router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (Admin only) - Name, email, role
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Find user by ID
        const user = await User.findById(req.params.id);

        // If the user doesn't exist
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user info
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        // Save updated user
        const updatedUser = await user.save();

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route DELETE /api/admin/users/:id
// @desc Delete a user (Admin only)
// @acess Private/Admin
router.delete("/:id", protect, admin, async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"User deleted successfully"});
        } else {
            res.status(404).json({message:"User not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


module.exports = router;