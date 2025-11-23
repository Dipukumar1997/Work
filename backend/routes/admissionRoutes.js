import express from 'express';
import {
  submitBasicDetails,
  uploadDocuments,
  processPayment,
  getStatus,
  downloadAdmissionPDF  // Add this new controller
} from '../controllers/admissionController.js';

const router = express.Router();

router.post('/basic-details', submitBasicDetails);
router.post('/upload-documents', uploadDocuments);
router.post('/payment', processPayment);
router.get('/status/:applicationId', getStatus);
router.get('/download-pdf/:applicationId', downloadAdmissionPDF); // Add this line

export default router;
