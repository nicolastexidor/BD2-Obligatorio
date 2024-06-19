import { Router } from 'express';
import { addPrediccion, getPredicciones, updateFinal, updatePrediccion } from '../controller/prediccion.controller';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { checkAdmin } from '../middleware/checkAdmin.middleware';
const router = Router();

router.post('/add', authenticateJWT, addPrediccion);
router.get('/', authenticateJWT, getPredicciones);
router.put('/update', authenticateJWT, updatePrediccion);
router.put('/update/final', authenticateJWT, checkAdmin, updateFinal);

export default router;