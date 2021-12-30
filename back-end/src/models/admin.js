"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Admin.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			admin_name: DataTypes.STRING,
			admin_email: {
				type: DataTypes.STRING,
				unique: true,
			},
			admin_password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Admin",
		}
	);
	return Admin;
};
