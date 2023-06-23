const mongoose = require("mongoose");
const express = require("express");
const { Project, generateJoinCode } = require("../models/project");
const { Member } = require("../models/member");
const { User } = require("../models/user");
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

// DELETE specified project
router.delete('/:id', async (req, res) => {
	const project = await Project.findByIdAndDelete(req.params.id);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');

    res.send(project);
});

// POST a new project member
router.post('/members', async (req, res) => {
	let project = await Project.findOne({ code: req.body.joinCode });
	if (!project)
		return res.status(404).send('A project with the given join code was not found.');

    const existingMember = await Member.findOne({
        project: project._id,
        user: req.body.userId,
    });
    if (existingMember)
		return res.status(400).send('The user is already a member for this project.');

    let newMember = new Member({
        user: req.body.userId,
        project: project._id,
    });
    newMember = await newMember.save();

    const user = await User.findById(newMember.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	console.log(user.projects);
	user.projects.push(project._id);
	await user.save();

    project.members.push(newMember._id);
	await project.save();

    res.send(newMember);
});

// DELETE a member
router.delete('/members/:id', async (req, res) => {
	const member = await Member.findByIdAndDelete(req.params.id);
	if (!member)
		return res.status(404).send('The member with the given ID was not found.');

	const project = await Project.findById(member.project);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');
	project.members.pull(member._id);
	await project.save();

    const user = await User.findById(member.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	user.projects.pull(project._id);
	await user.save();

	res.send(member);
});

module.exports = router;