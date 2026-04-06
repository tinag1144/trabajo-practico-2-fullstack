import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./src/config/database.js";
import { routes } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// rutas
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Server readyyyy");
});

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    await connectDb();
});