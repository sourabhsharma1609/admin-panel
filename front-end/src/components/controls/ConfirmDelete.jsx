import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function ConfirmDelete(props) {
	const { isDeleted, setIsDeleted } = props;

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			open={isDeleted}
			autoHideDuration={3000}
			onClose={() => setIsDeleted(false)}
		>
			<Alert onClose={() => setIsDeleted(false)} severity="error">
				User deleted
			</Alert>
		</Snackbar>
	);
}
