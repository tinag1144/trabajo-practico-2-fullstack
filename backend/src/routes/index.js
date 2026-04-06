import { Router } from "express";
import { routineRouter } from "./routine.routes.js";

const router = Router();

router.use("/", routineRouter);

export const routes = router;