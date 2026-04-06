import mysql from "mysql2/promise";

export let connection;

export const connectDb = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME
        });

        console.log("Base de datos conectada");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
};