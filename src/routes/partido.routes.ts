import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { addPartido, getPartidos, updatePartido } from '../controller/partido.controller';
const router = Router();

router.post('/add', authenticateJWT, addPartido);
router.get('/', getPartidos);
router.put('/update', authenticateJWT, updatePartido);


export default router;
