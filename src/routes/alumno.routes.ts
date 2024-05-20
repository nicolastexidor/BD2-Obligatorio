import { Router } from 'express';
import { getAlumnos } from '../controller/alumno.controller';

const router = Router();

router.get('/alumnos', getAlumnos);

export default router;
