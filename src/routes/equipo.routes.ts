import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { addEquipo, getEquipos } from '../controller/equipo.controller';
import { checkAdmin } from '../middleware/checkAdmin.middleware';
const router = Router();

router.post('/add', authenticateJWT, checkAdmin, addEquipo);
router.get('/', getEquipos);


export default router;
