import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { addEstadio, getEstadios } from '../controller/estadio.controller';
import { checkAdmin } from '../middleware/checkAdmin.middleware';
const router = Router();

router.post('/add', authenticateJWT, checkAdmin, addEstadio);
router.get('/', getEstadios);


export default router;
