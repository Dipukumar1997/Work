import Admission from '../models/Admission.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import { generateAdmissionPDF } from '../utils/pdfGenerator.js';

import PDFDocument from 'pdfkit';
// import Admission from '../models/Admission.js';


// import Admission from '../models/Admission.js';
// Generate unique application ID
const generateApplicationId = () => {
  return 'APP' + Date.now() + Math.floor(Math.random() * 1000);
};

// @desc    Submit basic details (Step 1)
// @route   POST /api/admission/basic-details
// @access  Public
export const submitBasicDetails = async (req, res) => {
  try {
    const { firstName, lastName, dob, email, phone, parentName, parentContact, classApplied } = req.body;

    // Check if email already exists in admissions
    const existingAdmission = await Admission.findOne({ 'basicDetails.email': email });
    if (existingAdmission) {
      return res.status(400).json({
        success: false,
        message: 'Application with this email already exists'
      });
    }

    const applicationId = generateApplicationId();

    const admission = await Admission.create({
      applicationId,
      basicDetails: {
        firstName,
        lastName,
        dob,
        email,
        phone,
        parentName,
        parentContact,
        class: classApplied
      }
    });

    res.status(201).json({
      success: true,
      message: 'Basic details submitted successfully',
      applicationId: admission.applicationId,
      admissionId: admission._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Upload documents (Step 2)
// @route   POST /api/admission/upload-documents
// @access  Public
export const uploadDocuments = async (req, res) => {
  try {
    const { applicationId, documents } = req.body;

    const admission = await Admission.findOne({ applicationId });
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    admission.documents = documents;
    await admission.save();

    res.status(200).json({
      success: true,
      message: 'Documents uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Process payment (Step 3)
// @route   POST /api/admission/payment
// @access  Public
export const processPayment = async (req, res) => {
  try {
    const { applicationId, transactionId, amount } = req.body;

    const admission = await Admission.findOne({ applicationId });
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    admission.payment = {
      transactionId,
      amount,
      status: 'completed',
      paymentDate: new Date()
    };
    
    await admission.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully. Your application is now submitted.',
      applicationId: admission.applicationId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get admission status
// @route   GET /api/admission/status/:applicationId
// @access  Public
export const getAdmissionStatus = async (req, res) => {
  try {
    const admission = await Admission.findOne({ 
      applicationId: req.params.applicationId 
    });

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      admission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
// Add this export to your existing admissionController.js

// export const downloadAdmissionPDF = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
    
//     const admission = await Admission.findOne({ applicationId });
    
//     if (!admission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admission not found'
//       });
//     }

//     // For now, return a simple response
//     // Later you can integrate PDFKit or return actual PDF URL
//     if (admission.admissionPdfUrl) {
//       return res.redirect(admission.admissionPdfUrl);
//     }

//     // Temporary: Return JSON with admission details
//     res.status(200).json({
//       success: true,
//       message: 'PDF generation not implemented yet',
//       applicationId: admission.applicationId,
//       studentName: `${admission.basicDetails.firstName} ${admission.basicDetails.lastName}`,
//       class: admission.basicDetails.class,
//       status: admission.status
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };


// @desc    Download admission PDF
// @route   GET /api/admission/download-pdf/:applicationId
// @access  Public
// export const downloadAdmissionPDF = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
    
//     const admission = await Admission.findOne({ applicationId });
    
//     if (!admission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admission not found'
//       });
//     }

//     // Create PDF document
//     const doc = new PDFDocument({ margin: 50 });

//     // Set response headers for PDF download
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=admission-${applicationId}.pdf`);

//     // Pipe PDF to response
//     doc.pipe(res);

//     // Add content to PDF
//     doc.fontSize(25).text('ARS Inter College', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(20).text('Admission Confirmation', { align: 'center', underline: true });
//     doc.moveDown(2);

//     // Application details
//     doc.fontSize(12);
//     doc.text(`Application ID: ${admission.applicationId}`, { bold: true });
//     doc.moveDown(0.5);
//     doc.text(`Date: ${new Date(admission.submittedDate).toLocaleDateString()}`);
//     doc.moveDown(1);

//     // Student Information
//     doc.fontSize(16).text('Student Information', { underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(12);
//     doc.text(`Name: ${admission.basicDetails.firstName} ${admission.basicDetails.lastName}`);
//     doc.text(`Date of Birth: ${new Date(admission.basicDetails.dob).toLocaleDateString()}`);
//     doc.text(`Email: ${admission.basicDetails.email}`);
//     doc.text(`Phone: ${admission.basicDetails.phone}`);
//     doc.text(`Class Applied: ${admission.basicDetails.class.toUpperCase()}`);
//     doc.moveDown(1);

//     // Parent Information
//     doc.fontSize(16).text('Parent/Guardian Information', { underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(12);
//     doc.text(`Parent Name: ${admission.basicDetails.parentName}`);
//     doc.text(`Parent Contact: ${admission.basicDetails.parentContact}`);
//     doc.moveDown(1);

//     // Payment Information
//     doc.fontSize(16).text('Payment Details', { underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(12);
//     doc.text(`Amount Paid: ₹${admission.payment.amount}`);
//     doc.text(`Transaction ID: ${admission.payment.transactionId}`);
//     doc.text(`Payment Status: ${admission.payment.status.toUpperCase()}`);
//     doc.text(`Payment Date: ${new Date(admission.payment.date).toLocaleDateString()}`);
//     doc.moveDown(2);

//     // Status
//     doc.fontSize(16).text('Application Status', { underline: true });
//     doc.moveDown(0.5);
//     doc.fontSize(14);
//     const statusColor = admission.status === 'approved' ? 'green' : 
//                        admission.status === 'submitted' ? 'blue' : 'red';
//     doc.fillColor(statusColor).text(admission.status.toUpperCase(), { bold: true });
//     doc.fillColor('black');
//     doc.moveDown(2);

//     // Footer
//     doc.fontSize(10);
//     doc.text('This is a computer-generated document. No signature required.', { align: 'center', italic: true });
//     doc.moveDown(0.5);
//     doc.text('For any queries, contact: admin@arsintercollege.edu', { align: 'center' });

//     // Finalize PDF
//     doc.end();

//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error generating PDF',
//       error: error.message
//     });
//   }
// };

// import PDFDocument from 'pdfkit';
// import Admission from '../models/Admission.js';

// @desc    Download admission PDF
// @route   GET /api/admission/download-pdf/:applicationId
// @access  Public
export const downloadAdmissionPDF = async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: 'Application ID is required'
      });
    }

    // Find admission in database
    const admission = await Admission.findOne({ applicationId });
    
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission record not found'
      });
    }

    // Check if admission has required data
    if (!admission.basicDetails || !admission.payment) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete admission data. Cannot generate PDF'
      });
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers BEFORE piping
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=admission-${applicationId}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // ===== PDF CONTENT =====
    
    // Header
    doc.fontSize(25).font('Helvetica-Bold').text('ARS Inter College', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(20).text('Admission Confirmation', { align: 'center', underline: true });
    doc.fontSize(12).font('Helvetica').text('___________________________________________________________', { align: 'center' });
    doc.moveDown(1);

    // Application ID and Date
    doc.fontSize(11);
    doc.text(`Application ID: ${admission.applicationId}`, { bold: true });
    doc.text(`Date: ${admission.submittedDate ? new Date(admission.submittedDate).toLocaleDateString() : 'N/A'}`);
    doc.moveDown(1);

    // Student Information Section
    doc.fontSize(14).font('Helvetica-Bold').text('STUDENT INFORMATION', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Full Name: ${admission.basicDetails.firstName || ''} ${admission.basicDetails.lastName || ''}`);
    doc.text(`Date of Birth: ${admission.basicDetails.dob ? new Date(admission.basicDetails.dob).toLocaleDateString() : 'N/A'}`);
    doc.text(`Email: ${admission.basicDetails.email || 'N/A'}`);
    doc.text(`Phone: ${admission.basicDetails.phone || 'N/A'}`);
    doc.text(`Class Applied: ${admission.basicDetails.classApplied ? admission.basicDetails.classApplied.toUpperCase() : 'N/A'}`);
    doc.moveDown(1);

    // Parent/Guardian Information
    doc.fontSize(14).font('Helvetica-Bold').text('PARENT/GUARDIAN INFORMATION', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Parent Name: ${admission.basicDetails.parentName || 'N/A'}`);
    doc.text(`Parent Contact: ${admission.basicDetails.parentContact || 'N/A'}`);
    doc.moveDown(1);

    // Payment Information
    doc.fontSize(14).font('Helvetica-Bold').text('PAYMENT DETAILS', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Amount Paid: ₹${admission.payment.amount || '0'}`);
    doc.text(`Transaction ID: ${admission.payment.transactionId || 'N/A'}`);
    doc.text(`Payment Status: ${(admission.payment.status || 'pending').toUpperCase()}`);
    doc.text(`Payment Date: ${admission.payment.date ? new Date(admission.payment.date).toLocaleDateString() : 'N/A'}`);
    doc.moveDown(1);

    // Application Status
    doc.fontSize(14).font('Helvetica-Bold').text('APPLICATION STATUS', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica-Bold');
    
    // Color based on status
    if (admission.status === 'approved') {
      doc.fillColor('green').text(admission.status.toUpperCase());
    } else if (admission.status === 'submitted') {
      doc.fillColor('blue').text(admission.status.toUpperCase());
    } else if (admission.status === 'rejected') {
      doc.fillColor('red').text(admission.status.toUpperCase());
    } else {
      doc.fillColor('black').text(admission.status ? admission.status.toUpperCase() : 'PENDING');
    }
    
    doc.fillColor('black');
    doc.moveDown(2);

    // Footer
    doc.fontSize(9).font('Helvetica').text('This is a computer-generated document. No signature is required.', { align: 'center', italic: true });
    doc.moveDown(0.3);
    doc.text('For queries, contact: admin@arsintercollege.edu | Phone: +91-XXXXX-XXXXX', { align: 'center' });
    doc.moveDown(0.3);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

    // Finalize PDF document
    doc.end();

    // Handle any errors during PDF generation
    doc.on('error', (err) => {
      console.error('PDF Generation Stream Error:', err);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error generating PDF document'
        });
      }
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    
    // Only send error response if headers haven't been sent yet
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Error generating PDF',
        error: error.message
      });
    }
  }
};


// import Admission from '../models/Admission.js';

// Your existing functions (submitBasicDetails, uploadDocuments, processPayment)
// ...

// Add these two NEW functions:

// @desc    Get admission status
// @route   GET /api/admission/status/:applicationId
// @access  Public
export const getStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const admission = await Admission.findOne({ applicationId });
    
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    res.status(200).json({
      success: true,
      admission: {
        applicationId: admission.applicationId,
        status: admission.status,
        studentName: `${admission.basicDetails.firstName} ${admission.basicDetails.lastName}`,
        class: admission.basicDetails.class,
        submittedDate: admission.submittedDate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Download admission PDF
// @route   GET /api/admission/download-pdf/:applicationId
// @access  Public
// export const downloadAdmissionPDF = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
    
//     const admission = await Admission.findOne({ applicationId });
    
//     if (!admission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admission not found'
//       });
//     }

//     // Check if admission is approved
//     if (admission.status !== 'approved' && admission.status !== 'submitted') {
//       return res.status(400).json({
//         success: false,
//         message: 'Admission is still pending or rejected'
//       });
//     }

//     // If PDF URL exists, redirect to it
//     if (admission.admissionPdfUrl) {
//       return res.redirect(admission.admissionPdfUrl);
//     }

//     // For now, return admission details as JSON
//     // Later you can implement actual PDF generation with PDFKit
//     res.status(200).json({
//       success: true,
//       message: 'PDF generation not implemented yet',
//       admission: {
//         applicationId: admission.applicationId,
//         studentName: `${admission.basicDetails.firstName} ${admission.basicDetails.lastName}`,
//         class: admission.basicDetails.class,
//         status: admission.status,
//         email: admission.basicDetails.email,
//         phone: admission.basicDetails.phone,
//         parentName: admission.basicDetails.parentName,
//         submittedDate: admission.submittedDate
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };
