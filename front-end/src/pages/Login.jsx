import React, { useState } from "react";
import {
	Avatar,
	TextField,
	Link,
	Box,
	Typography,
	Container,
	Snackbar,
	Button,
	Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const useStyles = makeStyles({
	align: {
		textAlign: "center",
		marginTop: "20px",
	},
});

const initialValues = {
	admin_email: "",
	admin_password: "",
};

export default function Login(props) {
	let navigate = useNavigate();
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setError("");
	};

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		AuthService.login(values)
			.then((res) => {
				setLoading(false);
				navigate("/board");
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.message);
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Email"
						name="admin_email"
						value={values.admin_email}
						onChange={handleChange}
						autoComplete="email"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="admin_password"
						label="Password"
						type="password"
						value={values.admin_password}
						onChange={handleChange}
						autoComplete="current-password"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 2 }}
					>
						{loading ? "Loading..." : "Login"}
					</Button>

					<Box className={classes.align}>
						<Link
							component={RouterLink}
							to="/signup"
							variant="body2"
							underline="hover"
						>
							{"Don't have an account? Sign Up"}
						</Link>
					</Box>
				</Box>
			</Box>

			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={error.length > 0}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error">
					{error}
				</Alert>
			</Snackbar>
		</Container>
	);
}
