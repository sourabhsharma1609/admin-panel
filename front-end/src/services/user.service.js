import axios from "axios";
import { authHeader } from "./auth-header";

// process.env.REACT_APP_API_URL
const API_URL = "http://localhost:5000";

const userService = {
	getAll: async () => {
		const response = await axios.get(`${API_URL}/user/list`, {
			headers: authHeader(),
		});
		return response.data;
	},

	update: async (id, data) => {
		const { user_name, user_password, total_orders } = data;
		const response = await axios.put(
			`${API_URL}/user/${id}`,
			{
				user_name,
				user_password,
				total_orders,
			},
			{
				headers: authHeader(),
			}
		);
		return response.data;
	},

	deleteById: async (id) => {
		const response = await axios.delete(`${API_URL}/user/${id}`, {
			headers: authHeader(),
		});
		return response.data;
	},

	create: async (data) => {
		const { user_name, user_email, user_password, user_image, total_orders } =
			data;
		const response = await axios.post(
			`${API_URL}/user/create`,
			{
				user_name,
				user_email,
				user_password,
				user_image,
				total_orders,
			},
			{
				headers: authHeader(),
			}
		);
		return response.data;
	},
};

export default userService;
