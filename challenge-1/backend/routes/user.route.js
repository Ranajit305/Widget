import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/check', verifyToken, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router