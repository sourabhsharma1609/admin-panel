import axios from "axios";
import { authHeader } from "./auth-header";

// process.env.REACT_APP_API_URL
const API_URL = "http://localhost:5000";

const AdminService = {
	getAdminById: async (id) => {
		const response = await axios.get(`${API_URL}/admin/${id}`, {
			headers: authHeader(),
		});
		return response.data;
	},
};

export default AdminService;
