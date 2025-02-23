import express from 'express';
import { getPulleys, createPulley } from '../controllers/pulleyController';

const router = express.Router();

router.get('/', getPulleys);
router.post('/', createPulley);

export default router;