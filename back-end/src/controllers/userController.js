const User = require("../models").User;
const express = require("express");

const router = express.Router();

const listUsers = router.get("/list", async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

const getById = router.get("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

const createUser = router.post("/create", async (req, res) => {
	try {
		const { user_name, user_email, user_password, user_image, total_orders } =
			req.body;
		const user = await User.create({
			user_name,
			user_email,
			user_password,
			user_image,
			total_orders,
		});
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

const updateUser = router.put("/:id", async (req, res) => {
	try {
		const { user_name, user_password, total_orders } = req.body;
		const user = await User.findByPk(req.params.id);
		if (user) {
			await user.update({
				user_name,
				user_password,
				total_orders,
			});
			res.status(200).send(user);
		} else {
			res.status(404).send({
				message: "User not found.",
			});
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

const deleteUser = router.delete("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			await user.destroy();
			res.status(200).send({
				message: "User deleted.",
			});
		} else {
			res.status(404).send({
				message: "User not found.",
			});
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = {
	listUsers,
	getById,
	createUser,
	updateUser,
	deleteUser,
};
