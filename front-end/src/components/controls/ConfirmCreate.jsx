import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function ConfirmCreate(props) {
	const { isCreated, setIsCreated } = props;

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			open={isCreated}
			autoHideDuration={3000}
			onClose={() => setIsCreated(false)}
		>
			<Alert onClose={() => setIsCreated(false)} severity="success">
				User created successfully
			</Alert>
		</Snackbar>
	);
}
