import express from 'express';
import {
  submitBasicDetails,
  uploadDocuments,
  processPayment,
  getAdmissionStatus
} from '../controllers/admissionController.js';

const router = express.Router();

router.post('/basic-details', submitBasicDetails);
router.post('/upload-documents', uploadDocuments);
router.post('/payment', processPayment);
router.get('/status/:applicationId', getAdmissionStatus);

export default router;
