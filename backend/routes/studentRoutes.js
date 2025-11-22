import express from 'express';
import {
  getStudentProfile,
  getDocuments,
  requestDocumentUpdate,
  getPaymentHistory,
  makePayment,
  getUpcomingExams,
  downloadAdmitCard,
  getMarksheets,
  sendApplication,
  getApplications
} from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/roleAuth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRoles('student'));

router.get('/profile', getStudentProfile);
router.get('/documents', getDocuments);
router.post('/documents/request-update', requestDocumentUpdate);
router.get('/payment-history', getPaymentHistory);
router.post('/payment', makePayment);
router.get('/exams', getUpcomingExams);
router.get('/admit-card/:examId', downloadAdmitCard);
router.get('/marksheets', getMarksheets);
router.post('/application', sendApplication);
router.get('/applications', getApplications);

export default router;
