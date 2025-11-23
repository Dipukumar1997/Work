import express from 'express';
import {
  addIPToWhitelist,
  getWhitelistedIPs,
  removeIPFromWhitelist,
  toggleIPStatus
} from '../controllers/ipWhitelistController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use(authorizeRoles('admin'));

router.post('/add', addIPToWhitelist);
router.get('/', getWhitelistedIPs);
router.delete('/:id', removeIPFromWhitelist);
router.patch('/:id/toggle', toggleIPStatus);

export default router;
