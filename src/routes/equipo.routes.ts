import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { addEquipo } from '../controller/equipo.controller';
const router = Router();

router.post('/add', authenticateJWT, addEquipo);


export default router;
