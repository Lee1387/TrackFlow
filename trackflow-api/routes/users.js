const mongoose = require("mongoose");
const express = require("express");
const { User, validateUser } = require("../models/user");
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
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    user = await user.save();
    res.send(user);
});

// Put specified user
router.put("/:id", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    if (!user) return res.status(404).send("The user with the given ID was not found.");

    res.send(user);
});

// Delete specified user
router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("The user with the given ID was not found.");

    res.send(user);
})

module.exports = router;