// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import Payment from '../models/Payment.js';
// import Student from '../models/Student.js';
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // @desc    Create payment order
// // @route   POST /api/payment/create-order
// // @access  Private (Student)
// export const createPaymentOrder = async (req, res) => {
//   try {
//     const { month, amount } = req.body;
//     const student = await Student.findOne({ userId: req.user._id });

//     if (!student) {
//       return res.status(404).json({ success: false, message: 'Student not found' });
//     }

//     // Create Razorpay order
//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         studentId: student._id.toString(),
//         month: month,
//         class: student.class
//       }
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json({
//       success: true,
//       order: {
//         id: order.id,
//         amount: order.amount,
//         currency: order.currency
//       },
//       keyId: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error('Create Order Error:', error);
//     res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
//   }
// };

// // @desc    Verify payment and save
// // @route   POST /api/payment/verify
// // @access  Private (Student)
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, month, amount } = req.body;

//     // Verify signature
//     const sign = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest('hex');

//     if (razorpay_signature !== expectedSign) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     const student = await Student.findOne({ userId: req.user._id });

//     // Save payment
//     const payment = await Payment.create({
//       studentId: student._id,
//       class: student.class,
//       month: month,
//       amount: amount,
//       paymentStatus: 'completed',
//       transactionId: razorpay_payment_id,
//       paymentDate: new Date(),
//       paymentMethod: 'online',
//       razorpayOrderId: razorpay_order_id
//     });

//     // Generate PDF receipt
//     const pdfPath = await generateReceipt(payment, student);

//     res.status(200).json({
//       success: true,
//       message: 'Payment successful',
//       payment: {
//         transactionId: payment.transactionId,
//         month: payment.month,
//         amount: payment.amount,
//         date: payment.paymentDate
//       },
//       receiptUrl: `/receipts/${path.basename(pdfPath)}`
//     });
//   } catch (error) {
//     console.error('Verify Payment Error:', error);
//     res.status(500).json({ success: false, message: 'Payment verification failed', error: error.message });
//   }
// };

// // Generate PDF Receipt
// const generateReceipt = async (payment, student) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const fileName = `receipt_${payment.transactionId}.pdf`;
//       const filePath = path.join(process.cwd(), 'public', 'receipts', fileName);

//       // Create directory if not exists
//       const dir = path.dirname(filePath);
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }

//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Header
//       doc.fontSize(20).text('ARS INTER COLLEGE', { align: 'center' });
//       doc.fontSize(12).text('Payment Receipt', { align: 'center' });
//       doc.moveDown();
//       doc.fontSize(10).text('एआरएस इंटर कॉलेज', { align: 'center' });
//       doc.moveDown(2);

//       // Receipt Details
//       doc.fontSize(12).text(`Receipt No: ${payment.transactionId}`, { underline: true });
//       doc.moveDown();

//       doc.fontSize(11);
//       doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
//       doc.text(`Roll Number: ${student.rollNumber}`);
//       doc.text(`Class: ${student.class}`);
//       doc.text(`Month: ${payment.month}`);
//       doc.text(`Amount Paid: ₹${payment.amount}`);
//       doc.text(`Payment Date: ${new Date(payment.paymentDate).toLocaleDateString('en-IN')}`);
//       doc.text(`Transaction ID: ${payment.transactionId}`);
//       doc.text(`Payment Mode: Online (UPI/Card)`);
//       doc.moveDown(2);

//       // Footer
//       doc.fontSize(10);
//       doc.text('This is a computer-generated receipt.', { align: 'center' });
//       doc.text('No signature required.', { align: 'center' });
//       doc.moveDown();
//       doc.text('Thank you for your payment!', { align: 'center' });

//       doc.end();

//       stream.on('finish', () => resolve(filePath));
//       stream.on('error', reject);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // @desc    Download receipt
// // @route   GET /api/payment/receipt/:transactionId
// // @access  Private (Student)
// export const downloadReceipt = async (req, res) => {
//   try {
//     const { transactionId } = req.params;
//     const payment = await Payment.findOne({ transactionId }).populate('studentId');

//     if (!payment) {
//       return res.status(404).json({ success: false, message: 'Payment not found' });
//     }

//     const filePath = path.join(process.cwd(), 'public', 'receipts', `receipt_${transactionId}.pdf`);

//     if (!fs.existsSync(filePath)) {
//       // Generate if doesn't exist
//       await generateReceipt(payment, payment.studentId);
//     }

//     res.download(filePath, `receipt_${transactionId}.pdf`);
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to download receipt', error: error.message });
//   }
// };







///next 



// import Payment from '../models/Payment.js';
// import Student from '../models/Student.js';
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';

// // @desc    Mock payment for testing (NO external gateway)
// // @route   POST /api/payment/mock-payment
// // @access  Private (Student)
// export const mockPayment = async (req, res) => {
//   try {
//     const { month, amount } = req.body;

//     // Get student info
//     const student = await Student.findOne({ userId: req.user._id });

//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     // Check if already paid for this month
//     const existingPayment = await Payment.findOne({
//       studentId: student._id,
//       month: month,
//       class: student.class,
//       paymentStatus: 'completed'
//     });

//     if (existingPayment) {
//       return res.status(400).json({
//         success: false,
//         message: `Payment for ${month} already completed`
//       });
//     }

//     // Generate realistic transaction ID
//     const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

//     // Create payment record
//     const payment = await Payment.create({
//       studentId: student._id,
//       class: student.class,
//       month: month,
//       feeType: 'Monthly Tuition Fee',
//       amount: amount,
//       paymentStatus: 'completed',
//       transactionId: transactionId,
//       paymentDate: new Date(),
//       paymentMethod: 'online'
//     });

//     // Generate PDF receipt
//     const pdfPath = await generateReceipt(payment, student);

//     res.status(200).json({
//       success: true,
//       message: `Payment for ${month} successful`,
//       payment: {
//         transactionId: payment.transactionId,
//         month: payment.month,
//         amount: payment.amount,
//         date: payment.paymentDate
//       },
//       receiptUrl: `/receipts/${path.basename(pdfPath)}`
//     });

//   } catch (error) {
//     console.error('Mock Payment Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Payment failed',
//       error: error.message
//     });
//   }
// };

// // Generate PDF Receipt
// const generateReceipt = async (payment, student) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const fileName = `receipt_${payment.transactionId}.pdf`;
//       const filePath = path.join(process.cwd(), 'public', 'receipts', fileName);

//       // Create directory if not exists
//       const dir = path.dirname(filePath);
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }

//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Header
//       doc.fontSize(20).text('ARS INTER COLLEGE', { align: 'center' });
//       doc.fontSize(12).text('Payment Receipt', { align: 'center' });
//       doc.moveDown();
//       doc.fontSize(10).text('एआरएस इंटर कॉलेज', { align: 'center' });
//       doc.moveDown(2);

//       // Receipt Details
//       doc.fontSize(12).text(`Receipt No: ${payment.transactionId}`, { underline: true });
//       doc.moveDown();

//       doc.fontSize(11);
//       doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
//       doc.text(`Roll Number: ${student.rollNumber}`);
//       doc.text(`Class: ${student.class}`);
//       doc.text(`Month: ${payment.month}`);
//       doc.text(`Amount Paid: ₹${payment.amount}`);
//       doc.text(`Payment Date: ${new Date(payment.paymentDate).toLocaleDateString('en-IN')}`);
//       doc.text(`Transaction ID: ${payment.transactionId}`);
//       doc.text(`Payment Mode: Online (UPI/Card)`);
//       doc.moveDown(2);

//       // Footer
//       doc.fontSize(10);
//       doc.text('This is a computer-generated receipt.', { align: 'center' });
//       doc.text('No signature required.', { align: 'center' });
//       doc.moveDown();
//       doc.text('Thank you for your payment!', { align: 'center' });

//       doc.end();

//       stream.on('finish', () => resolve(filePath));
//       stream.on('error', reject);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // @desc    Download receipt
// // @route   GET /api/payment/receipt/:transactionId
// // @access  Private (Student)
// export const downloadReceipt = async (req, res) => {
//   try {
//     const { transactionId } = req.params;
//     const payment = await Payment.findOne({ transactionId }).populate('studentId');

//     if (!payment) {
//       return res.status(404).json({ success: false, message: 'Payment not found' });
//     }

//     const filePath = path.join(process.cwd(), 'public', 'receipts', `receipt_${transactionId}.pdf`);

//     if (!fs.existsSync(filePath)) {
//       // Generate if doesn't exist
//       await generateReceipt(payment, payment.studentId);
//     }

//     res.download(filePath, `receipt_${transactionId}.pdf`);
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to download receipt', error: error.message });
//   }
// };



// import Stripe from 'stripe';
// import Payment from '../models/Payment.js';
// import Student from '../models/Student.js';
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // @desc    Create Stripe checkout session
// // @route   POST /api/payment/create-checkout
// // @access  Private (Student)


// // export const createCheckoutSession = async (req, res) => {
// //   try {
// //     const { month, amount } = req.body;
// //     const student = await Student.findOne({ userId: req.user._id });

// //     if (!student) {
// //       return res.status(404).json({ success: false, message: 'Student not found' });
// //     }

// //     // Check if already paid
// //     const existingPayment = await Payment.findOne({
// //       studentId: student._id,
// //       month: month,
// //       paymentStatus: 'completed'
// //     });

// //     if (existingPayment) {
// //       return res.status(400).json({ success: false, message: 'Already paid for this month' });
// //     }

// //     // Create Stripe checkout session
// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ['card'],
// //       line_items: [
// //         {
// //           price_data: {
// //             currency: 'inr',
// //             product_data: {
// //               name: `${month} - School Fee`,
// //               description: `ARS Inter College - Class ${student.class}`,
// //             },
// //             unit_amount: amount * 100, // Convert to paise
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       mode: 'payment',
// //       success_url: `http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}&month=${month}&amount=${amount}`,
// //       cancel_url: 'http://localhost:5173/payment',
// //       client_reference_id: student._id.toString(),
// //       metadata: {
// //         studentId: student._id.toString(),
// //         month: month,
// //         class: student.class,
// //         rollNumber: student.rollNumber
// //       }
// //     });

// //     res.status(200).json({
// //       success: true,
// //       sessionId: session.id,
// //       url: session.url
// //     });

// //   } catch (error) {
// //     console.error('Stripe Checkout Error:', error);
// //     res.status(500).json({ success: false, message: 'Failed to create checkout', error: error.message });
// //   }
// // };

// // Create Stripe checkout session with UPI support

// //  export const createCheckoutSession = async (req, res) => {
// //   try {
// //     const { month, amount } = req.body;
// //     const student = await Student.findOne({ userId: req.user._id });

// //     if (!student) {
// //       return res.status(404).json({ success: false, message: 'Student not found' });
// //     }

// //     // Create Stripe checkout session with card + UPI
// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ['card', 'upi'],  // Added UPI here!
// //       line_items: [
// //         {
// //           price_data: {
// //             currency: 'inr',
// //             product_data: {
// //               name: `${month} - School Fee`,
// //               description: `ARS Inter College - Class ${student.class}`,
// //             },
// //             unit_amount: amount * 100,
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       mode: 'payment',
// //       success_url: `http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}&month=${month}&amount=${amount}`,
// //       cancel_url: 'http://localhost:5173/payment',
// //       client_reference_id: student._id.toString(),
// //       metadata: {
// //         studentId: student._id.toString(),
// //         month: month,
// //         class: student.class,
// //         rollNumber: student.rollNumber
// //       }
// //     });

// //     res.status(200).json({
// //       success: true,
// //       sessionId: session.id,
// //       url: session.url
// //     });

// //   } catch (error) {
// //     console.error('Stripe Checkout Error:', error);
// //     res.status(500).json({ success: false, message: 'Failed to create checkout', error: error.message });
// //   }
// //  };


// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { month, amount } = req.body;
//     const student = await Student.findOne({ userId: req.user._id });

//     if (!student) {
//       return res.status(404).json({ success: false, message: 'Student not found' });
//     }

//     // Create Stripe checkout session - CARD ONLY
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],  // Remove 'upi' - not supported!
//       line_items: [
//         {
//           price_data: {
//             currency: 'inr',
//             product_data: {
//               name: `${month} - School Fee`,
//               description: `ARS Inter College - Class ${student.class}`,
//             },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}&month=${month}&amount=${amount}`,
//       cancel_url: 'http://localhost:5173/payment',
//       client_reference_id: student._id.toString(),
//       metadata: {
//         studentId: student._id.toString(),
//         month: month,
//         class: student.class,
//         rollNumber: student.rollNumber
//       }
//     });

//     res.status(200).json({
//       success: true,
//       sessionId: session.id,
//       url: session.url
//     });

//   } catch (error) {
//     console.error('Stripe Checkout Error:', error);
//     res.status(500).json({ success: false, message: 'Failed to create checkout', error: error.message });
//   }
// };



// // @desc    Verify and save payment
// // @route   POST /api/payment/verify-stripe
// // @access  Private (Student)
// export const verifyStripePayment = async (req, res) => {
//   try {
//     const { sessionId, month, amount } = req.body;
//     const student = await Student.findOne({ userId: req.user._id });

//     // Retrieve session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status !== 'paid') {
//       return res.status(400).json({ success: false, message: 'Payment not completed' });
//     }

//     // Save payment
//     const payment = await Payment.create({
//       studentId: student._id,
//       class: student.class,
//       month: month,
//       amount: amount,
//       paymentStatus: 'completed',
//       transactionId: session.payment_intent,
//       paymentDate: new Date(),
//       paymentMethod: 'online',
//       stripeSessionId: sessionId
//     });

//     // Generate PDF receipt
//     const pdfPath = await generateReceipt(payment, student);

//     res.status(200).json({
//       success: true,
//       message: 'Payment verified successfully',
//       payment: {
//         transactionId: payment.transactionId,
//         month: payment.month,
//         amount: payment.amount,
//         date: payment.paymentDate
//       },
//       receiptUrl: `/receipts/${path.basename(pdfPath)}`
//     });

//   } catch (error) {
//     console.error('Verify Stripe Payment Error:', error);
//     res.status(500).json({ success: false, message: 'Payment verification failed', error: error.message });
//   }
// };

// // Generate PDF Receipt
// const generateReceipt = async (payment, student) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const fileName = `receipt_${payment.transactionId}.pdf`;
//       const filePath = path.join(process.cwd(), 'public', 'receipts', fileName);

//       const dir = path.dirname(filePath);
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }

//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // Header
//       doc.fontSize(20).text('ARS INTER COLLEGE', { align: 'center' });
//       doc.fontSize(12).text('Payment Receipt', { align: 'center' });
//       doc.moveDown();
//       doc.fontSize(10).text('एआरएस इंटर कॉलेज', { align: 'center' });
//       doc.moveDown(2);

//       // Receipt Details
//       doc.fontSize(12).text(`Receipt No: ${payment.transactionId}`, { underline: true });
//       doc.moveDown();

//       doc.fontSize(11);
//       doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
//       doc.text(`Roll Number: ${student.rollNumber}`);
//       doc.text(`Class: ${student.class}`);
//       doc.text(`Month: ${payment.month}`);
//       doc.text(`Amount Paid: ₹${payment.amount}`);
//       doc.text(`Payment Date: ${new Date(payment.paymentDate).toLocaleDateString('en-IN')}`);
//       doc.text(`Transaction ID: ${payment.transactionId}`);
//       doc.text(`Payment Mode: Online (Card/UPI)`);
//       doc.moveDown(2);

//       // Footer
//       doc.fontSize(10);
//       doc.text('This is a computer-generated receipt.', { align: 'center' });
//       doc.text('No signature required.', { align: 'center' });
//       doc.moveDown();
//       doc.text('Thank you for your payment!', { align: 'center' });

//       doc.end();

//       stream.on('finish', () => resolve(filePath));
//       stream.on('error', reject);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // @desc    Download receipt
// // @route   GET /api/payment/receipt/:transactionId
// // @access  Private (Student)
// export const downloadReceipt = async (req, res) => {
//   try {
//     const { transactionId } = req.params;
//     const payment = await Payment.findOne({ transactionId }).populate('studentId');

//     if (!payment) {
//       return res.status(404).json({ success: false, message: 'Payment not found' });
//     }

//     const filePath = path.join(process.cwd(), 'public', 'receipts', `receipt_${transactionId}.pdf`);

//     if (!fs.existsSync(filePath)) {
//       await generateReceipt(payment, payment.studentId);
//     }

//     res.download(filePath, `receipt_${transactionId}.pdf`);
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to download receipt', error: error.message });
//   }
// };



import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import Student from '../models/Student.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const { month, amount } = req.body;
    const student = await Student.findOne({ userId: req.user._id });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${month} - School Fee`,
            description: `ARS Inter College - Class ${student.class}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}&month=${month}&amount=${amount}`,
      cancel_url: 'http://localhost:5173/payment',
      metadata: {
        studentId: student._id.toString(),
        month: month,
        class: student.class,
        rollNumber: student.rollNumber
      }
    });

    res.status(200).json({
      success: true,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Stripe payment
export const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId, month, amount } = req.body;

    console.log('Verifying payment:', { sessionId, month, amount });

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log('Stripe session:', session);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    // Get student
    const student = await Student.findOne({ userId: req.user._id });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if already paid
    const existingPayment = await Payment.findOne({
      studentId: student._id,
      month: month,
      paymentStatus: 'completed'
    });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: 'Payment already recorded',
        payment: {
          transactionId: existingPayment.transactionId,
          month: existingPayment.month,
          amount: existingPayment.amount
        }
      });
    }

    // Save payment
    const payment = await Payment.create({
      studentId: student._id,
      class: student.class,
      month: month,
      amount: parseInt(amount),
      paymentStatus: 'completed',
      transactionId: session.payment_intent || session.id,
      paymentDate: new Date(),
      paymentMethod: 'online'
    });

    console.log('Payment saved:', payment);

    // Generate PDF receipt
    try {
      await generateReceipt(payment, student);
      console.log('Receipt generated');
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      // Continue even if PDF fails
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment: {
        transactionId: payment.transactionId,
        month: payment.month,
        amount: payment.amount,
        date: payment.paymentDate
      }
    });

  } catch (error) {
    console.error('Verify Stripe Payment Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Payment verification failed', 
      error: error.message 
    });
  }
};

// Generate PDF Receipt
const generateReceipt = async (payment, student) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const fileName = `receipt_${payment.transactionId}.pdf`;
      const publicDir = path.join(process.cwd(), 'public', 'receipts');
      
      // Create directory if doesn't exist
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      const filePath = path.join(publicDir, fileName);
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);

      // Header
      doc.fontSize(22).text('ARS INTER COLLEGE', { align: 'center', underline: true });
      doc.moveDown(0.5);
      doc.fontSize(16).text('Payment Receipt', { align: 'center' });
      doc.fontSize(12).text('एआरएस इंटर कॉलेज', { align: 'center' });
      doc.moveDown(2);

      // Receipt details
      doc.fontSize(14).text(`Receipt No: ${payment.transactionId}`, { underline: true });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
      doc.text(`Roll Number: ${student.rollNumber}`);
      doc.text(`Class: ${student.class}`);
      doc.text(`Month: ${payment.month}`);
      doc.text(`Amount Paid: ₹${payment.amount}`);
      doc.text(`Payment Date: ${new Date(payment.paymentDate).toLocaleDateString('en-IN')}`);
      doc.text(`Transaction ID: ${payment.transactionId}`);
      doc.text(`Payment Mode: Online (Card)`);
      doc.moveDown(3);

      // Footer
      doc.fontSize(10);
      doc.text('This is a computer-generated receipt.', { align: 'center' });
      doc.text('No signature required.', { align: 'center' });
      doc.moveDown();
      doc.text('Thank you for your payment!', { align: 'center', bold: true });

      doc.end();

      stream.on('finish', () => {
        console.log('PDF created at:', filePath);
        resolve(filePath);
      });
      
      stream.on('error', (err) => {
        console.error('PDF stream error:', err);
        reject(err);
      });

    } catch (error) {
      console.error('PDF generation error:', error);
      reject(error);
    }
  });
};

// Download receipt
// export const downloadReceipt = async (req, res) => {
//   try {
//     const { transactionId } = req.params;
//     const payment = await Payment.findOne({ transactionId }).populate('studentId');

//     if (!payment) {
//       return res.status(404).json({ success: false, message: 'Payment not found' });
//     }

//     const filePath = path.join(process.cwd(), 'public', 'receipts', `receipt_${transactionId}.pdf`);

//     if (!fs.existsSync(filePath)) {
//       await generateReceipt(payment, payment.studentId);
//     }

//     res.download(filePath, `receipt_${transactionId}.pdf`);
//   } catch (error) {
//     console.error('Download error:', error);
//     res.status(500).json({ success: false, message: 'Failed to download receipt' });
//   }
// };


// Download receipt - no auth required

export const downloadReceipt = async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    const filePath = path.join(process.cwd(), 'public', 'receipts', `receipt_${transactionId}.pdf`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // If doesn't exist, try to find payment and generate
      const payment = await Payment.findOne({ transactionId }).populate('studentId');
      
      if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment not found' });
      }
      
      await generateReceipt(payment, payment.studentId);
    }

    // Send file
    res.download(filePath, `receipt_${transactionId}.pdf`, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ success: false, message: 'Failed to download receipt' });
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ success: false, message: 'Failed to download receipt' });
  }
};
