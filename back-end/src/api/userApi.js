const express = require("express");
const userController = require("../controllers").userController;

const router = express.Router();

const { listUsers, getById, createUser, updateUser, deleteUser } =
	userController;

router.use(listUsers);
router.use(getById);
router.use(createUser);
router.use(updateUser);
router.use(deleteUser);

module.exports = router;
