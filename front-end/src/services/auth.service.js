import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000";

const AuthService = {
	login: async (values) => {
		const { admin_email, admin_password } = values;
		const response = await axios.post(`${API_URL}/admin/login`, {
			admin_email,
			admin_password,
		});
		const { token } = response.data;
		Cookies.set("token", token);
		return response;
	},

	register: async (admin_name, admin_email, admin_password) => {
		const response = await axios.post(`${API_URL}/admin/register`, {
			admin_name,
			admin_email,
			admin_password,
		});
		return response.data;
	},

	logout: () => {
		Cookies.remove("token");
	},

	isAuthenticated: () => {
		const token = Cookies.get("token");
		if (token) {
			return true;
		}
		return false;
	},
};

export default AuthService;
