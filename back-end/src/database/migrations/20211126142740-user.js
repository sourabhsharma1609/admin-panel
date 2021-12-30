"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"Users",
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					allowNull: false,
					primaryKey: true,
					autoIncrement: false,
				},
				user_name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				user_email: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				user_password: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				user_image: {
					type: Sequelize.STRING,
				},
				total_orders: {
					type: Sequelize.INTEGER,
				},
				createdAt: {
					type: Sequelize.DATE,
				},
				updatedAt: {
					type: Sequelize.DATE,
				},
			},
			{
				freezeTableName: true,
			}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};
