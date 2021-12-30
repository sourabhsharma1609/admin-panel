"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			user_name: DataTypes.STRING,
			user_email: {
				type: DataTypes.STRING,
				unique: true,
			},
			user_password: DataTypes.STRING,
			user_image: DataTypes.STRING,
			total_orders: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
