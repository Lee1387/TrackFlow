const mongoose = require("mongoose");
const express = require("express");
const { Project, generateJoinCode } = require("../models/project");
const router = express.Router();

// Get specified project
router.get("/:id", async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project)
        return res.status(404).send("The project with the given ID was not found.");
    res.send(project);
});

// Post new project
router.post("/", async (req, res) => {
    const code = await generateJoinCode();

    let project = new Project({
        name: req.body.name,
        description: req.body.description,
        owner: req.body.owner,
        code: code,
    });

    project = await project.save();
    res.send(project);
});

// Put specified project
router.put("/:id", async (req, res) => {
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, description: req.body.description },
        { new: true }
    );
    if (!project)
        return res.status(404).send("The project with the given ID was not found.");

    res.send(project);
});

// Delete specified project
router.delete("/:id", async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
        return res.status(404).send("The project with the given ID was not found.");

    res.send(project);
});

module.exports = router;