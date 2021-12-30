const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const Admin = require("../models").Admin;

const router = express.Router();

const listAdmins = router.get("/list", async (req, res) => {
	try {
		const admins = await Admin.findAll();
		res.status(200).send(admins);
	} catch (error) {
		res.status(500).send(error);
	}
});

const getAdminById = router.get("/:id", async (req, res) => {
	try {
		const admin = await Admin.findByPk(req.params.id);
		res.status(200).send(admin);
	} catch (error) {
		res.status(500).send(error);
	}
});

const loginAdmin = router.post("/login", async (req, res) => {
	try {
		const { admin_email, admin_password } = req.body;
		const admin = await Admin.findOne({ where: { admin_email } });
		if (!admin) {
			return res.status(400).send({
				message: "Invalid email or password.",
			});
		}
		const isValidPassword = await bcrypt.compare(
			admin_password,
			admin.admin_password
		);
		if (!isValidPassword) {
			return res.status(400).send({
				message: "Invalid email or password.",
			});
		}
		const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
		res.status(200).send({ token });
	} catch (error) {
		res.status(500).send(error);
	}
});

const register = router.post("/register", async (req, res) => {
	try {
		const { admin_name, admin_email, admin_password } = req.body;
		const hashPassword = await bcrypt.hash(admin_password, 10);
		const alreadyExists = await Admin.findOne({
			where: { admin_email },
		});
		if (alreadyExists) {
			return res.status(400).send({
				message: "Admin already exists.",
			});
		}
		const admin = await Admin.create({
			admin_name,
			admin_email,
			admin_password: hashPassword,
		});
		res.status(200).send({
			admin,
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

const deleteAdmin = router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const admin = await Admin.findByPk(id);
		if (!admin) {
			return res.status(404).send({
				message: "Admin not found.",
			});
		}
		await admin.destroy();
		res.status(200).send({
			message: "Admin deleted.",
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = {
	listAdmins,
	loginAdmin,
	register,
	deleteAdmin,
	getAdminById,
};
