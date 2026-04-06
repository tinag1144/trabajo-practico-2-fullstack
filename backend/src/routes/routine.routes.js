import { Router } from "express";
import {
    createRoutine,
    getAllRoutines,
    getRoutineById,
    updateRoutine,
    deleteRoutine
} from "../controllers/routine.controller.js";

export const routineRouter = Router();

routineRouter.post("/routines", createRoutine);
routineRouter.get("/routines", getAllRoutines);
routineRouter.get("/routines/:id", getRoutineById);
routineRouter.put("/routines/:id", updateRoutine);
routineRouter.delete("/routines/:id", deleteRoutine);