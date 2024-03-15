"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dutyControllers_1 = require("../controllers/dutyControllers");
const router = express_1.default.Router();
router.post('/', dutyControllers_1.createDuty);
router.get('/', dutyControllers_1.getAllDuties);
router.get('/:id', dutyControllers_1.getDutyById);
router.put('/:id', dutyControllers_1.updateDuty);
router.delete('/:id', dutyControllers_1.deleteDuty);
exports.default = router;
