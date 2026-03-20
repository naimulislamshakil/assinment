import express from 'express';
import { login, registe } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', registe);
router.post('/login', login);

export default router;
