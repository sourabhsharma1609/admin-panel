import React, { useEffect, useState } from "react";
import {
	Box,
	Modal,
	TextField,
	Button,
	Typography,
	Avatar,
} from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const initialValues = {
	user_name: "",
	user_email: "",
	user_password: "",
	total_orders: "",
	user_image: "",
};

export default function CreateModal({
	open,
	handleClose,
	createRow,
	setIsCreated,
}) {
	const [values, setValues] = useState(initialValues);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createRow(values);
		handleClose();
		setIsCreated(true);
	};

	useEffect(() => {
		setValues(initialValues);
	}, [open]);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
				<Typography variant="h6">Add new user</Typography>
				<div style={{ marginTop: "18px" }} />
				<TextField
					label="User Name"
					variant="outlined"
					name="user_name"
					value={values.user_name}
					onChange={handleInputChange}
					required
					fullWidth
				/>
				<div style={{ marginTop: "10px" }} />
				<TextField
					label="User Email"
					variant="outlined"
					name="user_email"
					value={values.user_email}
					onChange={handleInputChange}
					required
					fullWidth
				/>
				<div style={{ marginTop: "10px" }} />

				<TextField
					label="User Password"
					variant="outlined"
					name="user_password"
					value={values.user_password}
					onChange={handleInputChange}
					required
					fullWidth
				/>
				<div style={{ marginTop: "10px" }} />

				<TextField
					label="Total Orders"
					variant="outlined"
					name="total_orders"
					value={values.total_orders}
					onChange={handleInputChange}
					fullWidth
				/>
				<div style={{ marginTop: "18px" }} />
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TextField
						label="User Image"
						variant="outlined"
						name="user_image"
						value={values.user_image}
						onChange={handleInputChange}
						fullWidth
					/>
					{values.user_image != "" ? (
						<Avatar
							src={values.user_image}
							sx={{ width: 56, height: 56 }}
							style={{ marginLeft: 10 }}
						/>
					) : null}
				</div>
				<div style={{ marginTop: "18px" }} />
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button variant="outlined" color="primary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="contained" color="primary" type="submit">
						Add
					</Button>
				</div>
			</Box>
		</Modal>
	);
}
