"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDuty = exports.updateDuty = exports.getDutyById = exports.getAllDuties = exports.createDuty = void 0;
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const createDuty = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        await databaseConfig_1.default.none('INSERT INTO duties (id, name) VALUES ($1, $2)', [id, name]);
        res.status(201).json({ 'created': true, id, name });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, req, res, next);
    }
};
exports.createDuty = createDuty;
const getAllDuties = async (req, res, next) => {
    try {
        const duties = await databaseConfig_1.default.any('SELECT * FROM duties');
        res.json(duties);
    }
    catch (error) {
        (0, errorHandler_1.default)(error, req, res, next);
    }
};
exports.getAllDuties = getAllDuties;
const getDutyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const duty = await databaseConfig_1.default.oneOrNone('SELECT * FROM duties WHERE id = $1', id);
        if (duty) {
            res.json(duty);
        }
        else {
            res.status(404).json({ message: 'Duty no encontrado' });
        }
    }
    catch (error) {
        (0, errorHandler_1.default)(error, req, res, next);
    }
};
exports.getDutyById = getDutyById;
const updateDuty = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await databaseConfig_1.default.none('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);
        res.json({ id, name });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, req, res, next);
    }
};
exports.updateDuty = updateDuty;
const deleteDuty = async (req, res, next) => {
    try {
        const { id } = req.params;
        await databaseConfig_1.default.none('DELETE FROM duties WHERE id = $1', id);
        res.json({ 'deleted': 1 });
    }
    catch (error) {
        (0, errorHandler_1.default)(error, req, res, next);
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
