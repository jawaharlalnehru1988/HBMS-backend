import express from 'express';
import { getAllBeds, addBed, updateBed, deleteBed, getBedById, getAvailableBeds, getOccupiedBeds, getPaginatedBeds } from '../controllers/bedController';
import authMiddleware from '../middleware/authMiddleware';

const bedRouter = express.Router();

bedRouter.use(authMiddleware);

bedRouter.post('/', addBed);
bedRouter.get('/', getAllBeds);
bedRouter.get('/page', getPaginatedBeds);
bedRouter.get('/:id', getBedById);
bedRouter.put('/:id', updateBed);
bedRouter.delete('/:id', deleteBed);
bedRouter.get('/getAvailableBeds', getAvailableBeds); 
bedRouter.get('/getOcupiedBeds', getOccupiedBeds);

export default bedRouter;