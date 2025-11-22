import express from 'express';
import {
  getTeacherProfile,
  updateProfile,
  getPaymentDetails,
  getAssignedClasses,
  getStudentsByClass,
  markAttendanceCriteria
} from '../controllers/teacherController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/roleAuth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRoles('teacher'));

router.get('/profile', getTeacherProfile);
router.put('/profile', updateProfile);
router.get('/payment-details', getPaymentDetails);
router.get('/classes', getAssignedClasses);
router.get('/students/:classId', getStudentsByClass);
router.put('/attendance-criteria', markAttendanceCriteria);

export default router;
