import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: "user_id",
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "available",
  },
});

export default User;
