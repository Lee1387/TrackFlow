const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

// Get current user
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).send("The user with the given ID was not found.");
    res.send({user});
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

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("An account with that email already exists.");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        pfp: req.body.pfp,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        pfp: user.pfp,
        projects: user.projects,
    });
});

// Put specified user
router.put("/:id", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
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