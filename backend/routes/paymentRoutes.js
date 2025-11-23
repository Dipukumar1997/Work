// import express from 'express';
// import { 
//   createCheckoutSession, 
//   verifyStripePayment, 
//   downloadReceipt 
// } from '../controllers/paymentController.js';
// import { authenticateToken } from '../middleware/auth.js';

// const router = express.Router();
// // Protected routes
// router.use('/create-checkout', authenticateToken);
// router.use('/verify-stripe', authenticateToken);

// router.post('/create-checkout', createCheckoutSession);
// router.post('/verify-stripe', verifyStripePayment);

// // Public route - no authentication needed for download
// router.get('/receipt/:transactionId', downloadReceipt);

// export default router;




import express from 'express';
import { 
  createCheckoutSession, 
  verifyStripePayment, 
  downloadReceipt 
} from '../controllers/paymentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use('/create-checkout', authenticateToken);
router.use('/verify-stripe', authenticateToken);

router.post('/create-checkout', createCheckoutSession);
router.post('/verify-stripe', verifyStripePayment);

// Public route - no authentication needed for download
router.get('/receipt/:transactionId', downloadReceipt);

export default router;

/*

*/

/*
  createPaymentOrder
  verifyPayment,
  import {
  mockPayment,
  downloadReceipt
} from '../controllers/paymentController.js';
*/