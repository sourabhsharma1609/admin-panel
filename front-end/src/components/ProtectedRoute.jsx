import React from "react";
import { Navigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const PrivateRoute = ({ children }) =>
	AuthService.isAuthenticated() ? children : <Navigate to="/" replace />;

export default PrivateRoute;
