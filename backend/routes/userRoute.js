import express from 'express';
import { registe } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', registe);

export default router;
