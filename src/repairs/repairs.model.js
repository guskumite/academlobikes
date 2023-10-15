import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";
import { timeStamp } from "console";

const Repair = sequelize.define("repair", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: "repair_id",
  },

  dayofservice: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "repair_date",
    defaultValue: timeStamp(),
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: "status",
    defaultValue: "pending",
  },

  motorsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: -1,
    field: "motors_number",
  },

  description: {
    type: DataTypes.STRING(55),
    allowNull: false,
    defaultValue: "/",
    field: "description",
  },

  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
});

export default Repair;
