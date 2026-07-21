import { Router } from 'express';
import { getCurrentUser, login, logout, register, getCourses} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, getCurrentUser);
router.post('/logout', logout);
router.get('/courses',requireAuth,getCourses);

export default router;