import express from 'express';
import {
  login,
  firstLoginPasswordUpdate,
  changePassword,
  registerAdmin,
  verifyToken
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register-admin', registerAdmin);
router.put('/first-login', authenticateToken, firstLoginPasswordUpdate);
router.put('/change-password', authenticateToken, changePassword);
router.get('/verify', authenticateToken, verifyToken);

export default router;
