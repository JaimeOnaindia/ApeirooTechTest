import express from 'express';
import { createDuty, getAllDuties, getDutyById, updateDuty, deleteDuty } from '../controllers/dutyControllers'


const router = express.Router();

router.post('/', createDuty);
router.get('/', getAllDuties);
router.get('/:id', getDutyById);
router.put('/:id', updateDuty);
router.delete('/:id', deleteDuty);

export default router;
