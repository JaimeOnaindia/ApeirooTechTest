"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDuty = exports.updateDuty = exports.getDutyById = exports.getAllDuties = exports.createDuty = void 0;
const uuid_1 = require("uuid");
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const createDuty = async (req, res) => {
    try {
        const { name } = req.body;
        const id = (0, uuid_1.v4)();
        await databaseConfig_1.default.none('INSERT INTO Duty (id, name) VALUES ($1, $2)', [id, name]);
        res.status(201).json({ id, name });
    }
    catch (error) {
        console.error('Error creando el Duty:', error);
        res.status(500).send('Error interno del servidor');
    }
};
exports.createDuty = createDuty;
const getAllDuties = async (_req, res) => {
    try {
        const duties = await databaseConfig_1.default.any('SELECT * FROM Duty');
        res.json(duties);
    }
    catch (error) {
        console.error('Error obteniendo los Duties:', error);
        res.status(500).send('Error interno del servidor');
    }
};
exports.getAllDuties = getAllDuties;
const getDutyById = async (req, res) => {
    try {
        const { id } = req.params;
        const duty = await databaseConfig_1.default.oneOrNone('SELECT * FROM Duty WHERE id = $1', id);
        if (duty) {
            res.json(duty);
        }
        else {
            res.status(404).send('Duty no encontrado');
        }
    }
    catch (error) {
        console.error('Error obteniendo el Duty:', error);
        res.status(500).send('Error interno del servidor');
    }
};
exports.getDutyById = getDutyById;
const updateDuty = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await databaseConfig_1.default.none('UPDATE Duty SET name = $1 WHERE id = $2', [name, id]);
        res.json({ id, name });
    }
    catch (error) {
        console.error('Error actualizando el Duty:', error);
        res.status(500).send('Error interno del servidor');
    }
};
exports.updateDuty = updateDuty;
const deleteDuty = async (req, res) => {
    try {
        const { id } = req.params;
        await databaseConfig_1.default.none('DELETE FROM Duty WHERE id = $1', id);
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Error eliminando el Duty:', error);
        res.status(500).send('Error interno del servidor');
    }
};
exports.deleteDuty = deleteDuty;
module.exports = {
    getAllDuties: exports.getAllDuties,
    getDutyById: exports.getDutyById,
    createDuty: exports.createDuty,
    updateDuty: exports.updateDuty,
    deleteDuty: exports.deleteDuty
};
