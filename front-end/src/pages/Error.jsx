import { Box, Container, CssBaseline, Link, Typography } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";

import animationData from "../Data/images/err.json";

export default function Error() {
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Lottie
					options={{
						loop: true,
						autoplay: true,
						animationData: animationData,
					}}
					height={400}
					width={400}
				/>
				<Typography variant="h6" component="h1" textAlign={"center"}>
					The page you are looking for does not exist.
				</Typography>
				<Link
					to="/"
					textAlign={"center"}
					underline="none"
					variant="body2"
					component="button"
				>
					Go back to the homepage
				</Link>
			</Box>
		</Container>
	);
}
