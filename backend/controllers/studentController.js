import Student from '../models/Student.js';
import User from '../models/User.js';
import Exam from '../models/Exam.js';
import Application from '../models/Application.js';

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private (Student)
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id })
      .populate('courseId')
      .populate('attendanceCriteria.subjectId')
      .populate('attendanceCriteria.teacherId', 'firstName lastName');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.status(200).json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get student documents
// @route   GET /api/student/documents
// @access  Private (Student)
export const getDocuments = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    
    res.status(200).json({
      success: true,
      documents: student.documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Request document update permission
// @route   POST /api/student/documents/request-update
// @access  Private (Student)
export const requestDocumentUpdate = async (req, res) => {
  try {
    const { docType, reason } = req.body;
    
    const student = await Student.findOne({ userId: req.user.id });
    
    // Create application to admin
    await Application.create({
      studentId: student._id,
      subject: 'Document Update Request',
      message: `Request to update ${docType}. Reason: ${reason}`
    });

    res.status(200).json({
      success: true,
      message: 'Document update request sent to admin'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get payment history
// @route   GET /api/student/payment-history
// @access  Private (Student)
export const getPaymentHistory = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    
    res.status(200).json({
      success: true,
      paymentHistory: student.paymentHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Make payment
// @route   POST /api/student/payment
// @access  Private (Student)
export const makePayment = async (req, res) => {
  try {
    const { amount, purpose, transactionId } = req.body;
    
    const student = await Student.findOne({ userId: req.user.id });
    
    student.paymentHistory.push({
      transactionId,
      amount,
      purpose,
      status: 'completed',
      date: new Date()
    });
    
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Payment successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get upcoming exams
// @route   GET /api/student/exams
// @access  Private (Student)
export const getUpcomingExams = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    
    const exams = await Exam.find({ 
      class: student.class,
      examDate: { $gte: new Date() }
    }).populate('subjects');

    res.status(200).json({
      success: true,
      exams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Download admit card
// @route   GET /api/student/admit-card/:examId
// @access  Private (Student)
export const downloadAdmitCard = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    
    // Check if all attendance criteria are met
    const allCriteriaMet = student.attendanceCriteria.every(
      criteria => criteria.criteriaMet === true
    );

    if (!allCriteriaMet) {
      const unmetCriteria = student.attendanceCriteria
        .filter(c => !c.criteriaMet)
        .map(c => c.subjectId);
        
      return res.status(403).json({
        success: false,
        message: 'You have not fulfilled the attendance criteria in some subjects. Please contact admin.',
        unmetSubjects: unmetCriteria
      });
    }

    const exam = await Exam.findById(req.params.examId);
    
    if (!exam.admitCardAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Admit card is not yet available for this exam'
      });
    }

    // Generate admit card PDF (implement in utils)
    const admitCardUrl = `admit-cards/${student.rollNumber}-${exam._id}.pdf`;

    res.status(200).json({
      success: true,
      admitCardUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all marksheets
// @route   GET /api/student/marksheets
// @access  Private (Student)
export const getMarksheets = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id })
      .populate('examResults.examId');
    
    res.status(200).json({
      success: true,
      examResults: student.examResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Send application to admin
// @route   POST /api/student/application
// @access  Private (Student)
export const sendApplication = async (req, res) => {
  try {
    const { subject, message } = req.body;
    
    const student = await Student.findOne({ userId: req.user.id });
    
    const application = await Application.create({
      studentId: student._id,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Application sent successfully',
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all applications
// @route   GET /api/student/applications
// @access  Private (Student)
export const getApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    
    const applications = await Application.find({ studentId: student._id });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
