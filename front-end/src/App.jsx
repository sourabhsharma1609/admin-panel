import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Login, SignUp, Error } from "./pages";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import PrivateRoute from "../src/components/ProtectedRoute";

const theme = createTheme({
	palette: {
		secondary: {
			main: orange[500],
		},
	},
});
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route
					path="/board"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<Error />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
