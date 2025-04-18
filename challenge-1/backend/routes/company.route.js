import express from 'express'
import { getCompanies, updateStatus } from '../controllers/company.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router();

router.get('/accounts', verifyToken, getCompanies);
router.post('/accounts/:id', verifyToken, updateStatus);

export default router