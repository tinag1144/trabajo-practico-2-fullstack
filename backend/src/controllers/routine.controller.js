import { routineModel } from "../models/routine.model.js";

// CREATE
export const createRoutine = async (req, res) => {
    const { subject, hours, priority } = req.body;

    try {
        if (!subject || !hours) {
            return res.status(400).json({
                message: "Campos obligatorios faltantes"
            });
        }

        await routineModel.create({
            subject,
            hours,
            priority
        });

        res.status(201).json({
            message: "Rutina creada con éxito"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al crear rutina"
        });
    }
};

// GET ALL
export const getAllRoutines = async (req, res) => {
    try {
        const routines = await routineModel.findAll();
        res.status(200).json(routines);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener rutinas"
        });
    }
};

// GET BY ID
export const getRoutineById = async (req, res) => {
    const { id } = req.params;

    try {
        const routine = await routineModel.findByPk(id);

        if (!routine) {
            return res.status(404).json({
                message: "Rutina no encontrada"
            });
        }

        res.status(200).json(routine);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener rutina"
        });
    }
};

// UPDATE
export const updateRoutine = async (req, res) => {
    const { id } = req.params;
    const { subject, hours, priority } = req.body;

    try {
        const routine = await routineModel.findByPk(id);

        if (!routine) {
            return res.status(404).json({
                message: "Rutina no encontrada"
            });
        }

        await routine.update({
            subject,
            hours,
            priority
        });

        res.status(200).json({
            message: "Rutina actualizada"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar"
        });
    }
};

// DELETE
export const deleteRoutine = async (req, res) => {
    const { id } = req.params;

    try {
        const routine = await routineModel.findByPk(id);

        if (!routine) {
            return res.status(404).json({
                message: "Rutina no encontrada"
            });
        }

        await routine.destroy();

        res.status(200).json({
            message: "Rutina eliminada"
        });
    } catch (error) {
    console.error("Error real al eliminar:", error);

    res.status(500).json({
        message: "Error al eliminar"
    });
}}