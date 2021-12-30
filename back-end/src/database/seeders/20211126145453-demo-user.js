"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					id: "afe29a1a-4830-4a81-b0b4-38dc35668e6f",
					user_name: "luffy",
					user_email: "luffy@gmail.com",
					user_password: "luffy",
					user_image: "https://tinyurl.com/2p8tncnh",
					total_orders: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "8c5d89bd-079c-47ea-a870-81b18a6c91d5",
					user_name: "zoro",
					user_email: "zoro@gmail.com",
					user_password: "zoro",
					user_image: "https://tinyurl.com/2p93yv2x",
					total_orders: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "cb538ee2-2a9d-48eb-855d-d9eff23afcd7",
					user_name: "sanji",
					user_email: "sanji@gmail.com",
					user_password: "sanji",
					user_image: "https://tinyurl.com/34shhv2z",
					total_orders: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
