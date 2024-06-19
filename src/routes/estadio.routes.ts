import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { addEstadio, getEstadioById, getEstadios } from '../controller/estadio.controller';
import { checkAdmin } from '../middleware/checkAdmin.middleware';
const router = Router();

router.post('/add', authenticateJWT, checkAdmin, addEstadio);
router.get('/', getEstadios);
router.get('/getById/:id', getEstadioById);


export default router;
