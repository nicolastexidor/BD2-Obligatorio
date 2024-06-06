import { Router } from 'express';
import { getAlumnos, login, register, getPuntos, getLeaderBoard } from '../controller/alumno.controller';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';

const router = Router();

router.get('/', getAlumnos);
router.post('/register', register);
router.post('/login', login);
router.get('/puntos', authenticateJWT, getPuntos);
router.get('/leaderboard', getLeaderBoard);

export default router;
