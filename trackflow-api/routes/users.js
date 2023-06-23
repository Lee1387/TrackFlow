const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

// Get current user
router.get("/me", async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

// Get specified user
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("The user with the given ID was not found.");
        res.send(user);
});

// Post new user
router.post("/", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    user = await user.save();
    res.send(user);
});

// Put specified user
router.put("./:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    if (!user) return res.status(404).send("The user with the given ID was not found.");

    res.send(user);
});

// Delete specified user

module.exports = router;