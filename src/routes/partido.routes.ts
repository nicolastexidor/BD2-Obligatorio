import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { addPartido, getPartidos, updatePartido } from '../controller/partido.controller';
import { checkAdmin } from '../middleware/checkAdmin.middleware';
const router = Router();

router.post('/add', authenticateJWT, checkAdmin, addPartido);
router.get('/', getPartidos);
router.put('/update', authenticateJWT, checkAdmin, updatePartido);


export default router;
