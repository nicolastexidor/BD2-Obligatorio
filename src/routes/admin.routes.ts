import { Router } from 'express';
import { adminLogin, registerAdmin } from '../controller/admin.controller';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
import { checkAdmin } from '../middleware/checkAdmin.middleware';
const router = Router();

router.post('/register', authenticateJWT, checkAdmin, registerAdmin);
router.post('/login', adminLogin);

export default router;