import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const routineModel = sequelize.define("Routine", {
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priority: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    tableName: "routines",
    timestamps: true,
});