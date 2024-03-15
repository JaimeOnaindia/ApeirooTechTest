import express from 'express';
import { createDuty, getAllDuties, getDutyById, updateDuty, deleteDuty } from '../controllers/dutyControllers'


const router = express.Router();

router.get('/', getAllDuties);
router.get('/:id', getDutyById);
router.post('/', createDuty);
router.put('/:id', updateDuty);
router.delete('/:id', deleteDuty);

export default router;
