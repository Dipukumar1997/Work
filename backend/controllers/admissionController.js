import Admission from '../models/Admission.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import { generateAdmissionPDF } from '../utils/pdfGenerator.js';

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
