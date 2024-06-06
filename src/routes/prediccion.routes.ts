import { Router } from 'express';
import { addPrediccion, getPredicciones, updatePrediccion } from '../controller/prediccion.controller';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
const router = Router();

router.post('/add', authenticateJWT, addPrediccion);
router.get('/', authenticateJWT, getPredicciones);
router.put('/update', authenticateJWT, updatePrediccion);

export default router;