import express from 'express';
import { login, me, registe } from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registe);
router.post('/login', login);
router.get('/me', isAuthenticated, me);

export default router;
