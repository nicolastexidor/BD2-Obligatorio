import { Router } from 'express';
import { addCarrera, getCarreras } from '../controller/carrera.controller';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { checkAdmin } from '../middleware/checkAdmin.middleware';

const router = Router();

router.get('/', getCarreras);
router.post('/add', authenticateJWT, checkAdmin, addCarrera);


export default router;
