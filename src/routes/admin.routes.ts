import { Router } from 'express';
import { adminLogin, registerAdmin } from '../controller/admin.controller';
import { authenticateJWT } from '../middleware/authenticateJWT.middleware';
const router = Router();

router.get('/', );
router.post('/register', authenticateJWT, registerAdmin);
router.post('/login', adminLogin);

export default router;