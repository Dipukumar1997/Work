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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user (admin/student/teacher)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@school.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/register-admin:
 *   post:
 *     summary: Register first admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@school.com
 *               password:
 *                 type: string
 *                 example: admin123
 *               firstName:
 *                 type: string
 *                 example: Admin
 *               lastName:
 *                 type: string
 *                 example: User
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       403:
 *         description: Admin already exists
 */
router.post('/register-admin', registerAdmin);
router.put('/first-login', authenticateToken, firstLoginPasswordUpdate);
router.put('/change-password', authenticateToken, changePassword);
/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify JWT token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       403:
 *         description: Invalid token
 */
router.get('/verify', authenticateToken, verifyToken);

export default router;
