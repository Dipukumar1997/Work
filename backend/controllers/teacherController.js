import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import Subject from '../models/Subject.js';

// @desc    Get teacher profile
// @route   GET /api/teacher/profile
// @access  Private (Teacher)
export const getTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id })
      .populate('subjects');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found'
      });
    }

    res.status(200).json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update teacher profile
// @route   PUT /api/teacher/profile
// @access  Private (Teacher)
export const updateProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    
    const { bio, qualifications, previousWork, degrees, experience } = req.body;
    
    teacher.profile = {
      bio: bio || teacher.profile.bio,
      qualifications: qualifications || teacher.profile.qualifications,
      previousWork: previousWork || teacher.profile.previousWork,
      degrees: degrees || teacher.profile.degrees,
      experience: experience || teacher.profile.experience
    };
    
    await teacher.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get payment details
// @route   GET /api/teacher/payment-details
// @access  Private (Teacher)
export const getPaymentDetails = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    
    res.status(200).json({
      success: true,
      paymentDetails: teacher.paymentDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get assigned classes
// @route   GET /api/teacher/classes
// @access  Private (Teacher)
export const getAssignedClasses = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });
    
    res.status(200).json({
      success: true,
      classes: teacher.classes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get students by class
// @route   GET /api/teacher/students/:classId
// @access  Private (Teacher)
export const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.classId })
      .populate('userId', 'email')
      .select('rollNumber firstName lastName attendanceCriteria');

    res.status(200).json({
      success: true,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Mark student attendance criteria
// @route   PUT /api/teacher/attendance-criteria
// @access  Private (Teacher)
export const markAttendanceCriteria = async (req, res) => {
  try {
    const { studentId, subjectId, criteriaMet } = req.body;
    
    const teacher = await Teacher.findOne({ userId: req.user.id });
    const student = await Student.findById(studentId);
    
    // Find the criteria index
    const criteriaIndex = student.attendanceCriteria.findIndex(
      c => c.subjectId.toString() === subjectId && 
           c.teacherId.toString() === teacher._id.toString()
    );

    if (criteriaIndex === -1) {
      // Add new criteria
      student.attendanceCriteria.push({
        subjectId,
        teacherId: teacher._id,
        criteriaMet
      });
    } else {
      // Update existing criteria
      student.attendanceCriteria[criteriaIndex].criteriaMet = criteriaMet;
    }
    
    await student.save();

    res.status(200).json({
      success: true,
      message: 'Attendance criteria updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
