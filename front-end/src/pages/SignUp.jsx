import React, { useState } from "react";
import {
	Avatar,
	Button,
	TextField,
	Link,
	Box,
	Typography,
	Container,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const useStyles = makeStyles({
	align: {
		textAlign: "center",
	},
});

const initialValues = {
	admin_email: "",
	admin_name: "",
	admin_password: "",
};

const initialErrors = {
	err_email: "",
	err_name: "",
	err_password: "",
	err_server: "",
};

export default function SignUp() {
	let navigate = useNavigate();
	const classes = useStyles();
	const [values, setValues] = useState(initialValues);
	const [error, setError] = useState(initialErrors);

	const validate = () => {
		let err = { ...initialErrors };
		let valid = true;
		if (values.admin_email === "") {
			err.err_email = "Email is required";
			valid = false;
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.admin_email)
		) {
			err.err_email = "Invalid email address";
			valid = false;
		}
		if (values.admin_name === "") {
			err.err_name = "Name is required";
			valid = false;
		}
		if (values.admin_password === "") {
			err.err_password = "Password is required";
			valid = false;
		} else if (values.admin_password.length < 6) {
			err.err_password = "Password must be at least 6 characters long";
			valid = false;
		}
		setError(err);
		return valid;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validate()) {
			AuthService.register(
				values.admin_name,
				values.admin_email,
				values.admin_password
			).then((res) => {
				if (res) {
					navigate("/");
				} else {
					setError({
						err_server: "Admin already exists",
					});
				}
			});
		}
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
				<Avatar sx={{ m: 1, bgcolor: "#eba134" }}>
					<AccountCircleRoundedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						label="User Name"
						name="admin_name"
						value={values.admin_name}
						onChange={handleChange}
						autoComplete="username"
						error={error.err_name !== ""}
						helperText={error.err_name}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Email Address"
						name="admin_email"
						value={values.admin_email}
						onChange={handleChange}
						autoComplete="email"
						error={error.err_email !== ""}
						helperText={error.err_email}
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
						error={error.err_password !== ""}
						helperText={error.err_password}
					/>

					{error.err_server !== "" && (
						<Box sx={{ mt: 2 }}>
							<Typography variant="body2" color="error">
								{error.err_server}
							</Typography>
						</Box>
					)}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Box className={classes.align}>
						<Link
							component={RouterLink}
							to="/"
							variant="body2"
							underline="hover"
						>
							{"Do you have an account? Login"}
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
