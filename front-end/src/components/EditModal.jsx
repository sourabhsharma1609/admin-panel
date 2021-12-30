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

export default function EditModal({ openE, handleCloseE, row, updateRow }) {
	const [values, setValues] = useState(row);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleCloseE();
		updateRow(values.id, {
			user_name: values.user_name,
			user_password: values.user_password,
			total_orders: values.total_orders,
		});
	};

	useEffect(() => {
		setValues(row);
	}, [row]);

	return (
		<Modal
			open={openE}
			onClose={handleCloseE}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
				<Typography variant="h6" align="center">
					Update user info
				</Typography>
				<div style={{ marginTop: "16px" }} />
				<Avatar
					src={values.user_image}
					sx={{ width: 80, height: 80, margin: "0 auto" }}
				/>
				<div style={{ marginTop: "16px" }} />

				<Typography variant="body1" align="center">
					{values.user_email}
				</Typography>
				<div style={{ marginTop: "20px" }} />

				<TextField
					label="User Name"
					variant="outlined"
					name="user_name"
					value={values.user_name}
					onChange={handleInputChange}
					required
					fullWidth
				/>
				<div style={{ marginTop: 16 }} />

				<TextField
					label="User Password"
					variant="outlined"
					name="user_password"
					value={values.user_password}
					onChange={handleInputChange}
					required
					fullWidth
				/>
				<div style={{ marginTop: 16 }} />

				<TextField
					label="Total Orders"
					variant="outlined"
					name="total_orders"
					value={values.total_orders}
					onChange={handleInputChange}
					fullWidth
				/>
				<div style={{ marginTop: "20px" }} />

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button variant="outlined" color="primary" onClick={handleCloseE}>
						Cancel
					</Button>
					<Button variant="contained" color="primary" type="submit">
						update
					</Button>
				</div>
			</Box>
		</Modal>
	);
}
