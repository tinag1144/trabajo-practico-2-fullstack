import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado a la base de datos ");

        await sequelize.sync();
        console.log("Tablas sincronizadas");
    } catch (error) {
        console.error("Error en DB:", error);
    }
};