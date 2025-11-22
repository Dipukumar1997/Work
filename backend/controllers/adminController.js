// import User from '../models/User.js';
// import Student from '../models/Student.js';
// import Teacher from '../models/Teacher.js';
// import Admission from '../models/Admission.js';
// import Exam from '../models/Exam.js';
// import Subject from '../models/Subject.js';
// import Application from '../models/Application.js';
// import { generateAdmissionPDF } from '../utils/pdfGenerator.js';

// // Generate unique roll number
// const generateRollNumber = async (className) => {
//   const year = new Date().getFullYear();
//   const count = await Student.countDocuments({ class: className });
//   return `${year}${className}${String(count + 1).padStart(4, '0')}`;
// };

// // @desc    Get all students
// // @route   GET /api/admin/students
// // @access  Private (Admin)
// export const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find()
//       .populate('userId', 'email')
//       .populate('courseId');

//     res.status(200).json({
//       success: true,
//       count: students.length,
//       students
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Get single student
// // @route   GET /api/admin/students/:id
// // @access  Private (Admin)
// export const getStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id)
//       .populate('userId')
//       .populate('courseId')
//       .populate('attendanceCriteria.subjectId')
//       .populate('attendanceCriteria.teacherId');

//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       student
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Add new student
// // @route   POST /api/admin/students
// // @access  Private (Admin)
// export const addStudent = async (req, res) => {
//   try {
//     const { email, firstName, lastName, className, address, courseId } = req.body;

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     // Generate temporary password
//     const tempPassword = Math.random().toString(36).slice(-8);
//     const rollNumber = await generateRollNumber(className);

//     // Create user
//     user = await User.create({
//       email,
//       password: tempPassword,
//       role: 'student'
//     });

//     // Create student
//     const student = await Student.create({
//       userId: user._id,
//       rollNumber,
//       firstName,
//       lastName,
//       class: className,
//       address,
//       courseId
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Student added successfully',
//       student,
//       credentials: {
//         email,
//         password: tempPassword,
//         rollNumber
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

// // @desc    Update student
// // @route   PUT /api/admin/students/:id
// // @access  Private (Admin)
// export const updateStudent = async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Student updated successfully',
//       student
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Delete student
// // @route   DELETE /api/admin/students/:id
// // @access  Private (Admin)
// export const deleteStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
    
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     await User.findByIdAndDelete(student.userId);
//     await student.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: 'Student deleted successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Get all teachers
// // @route   GET /api/admin/teachers
// // @access  Private (Admin)
// export const getAllTeachers = async (req, res) => {
//   try {
//     const teachers = await Teacher.find()
//       .populate('userId', 'email')
//       .populate('subjects');

//     res.status(200).json({
//       success: true,
//       count: teachers.length,
//       teachers
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Add new teacher
// // @route   POST /api/admin/teachers
// // @access  Private (Admin)
// export const addTeacher = async (req, res) => {
//   try {
//     const { email, firstName, lastName, subjects, classes, profile } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     const tempPassword = Math.random().toString(36).slice(-8);
//     const teacherId = 'T' + Date.now();

//     user = await User.create({
//       email,
//       password: tempPassword,
//       role: 'teacher'
//     });

//     const teacher = await Teacher.create({
//       userId: user._id,
//       teacherId,
//       firstName,
//       lastName,
//       subjects,
//       classes,
//       profile
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Teacher added successfully',
//       teacher,
//       credentials: {
//         email,
//         password: tempPassword,
//         teacherId
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

// // @desc    Update teacher
// // @route   PUT /api/admin/teachers/:id
// // @access  Private (Admin)
// export const updateTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: 'Teacher not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Teacher updated successfully',
//       teacher
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Delete teacher
// // @route   DELETE /api/admin/teachers/:id
// // @access  Private (Admin)
// export const deleteTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id);
    
//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: 'Teacher not found'
//       });
//     }

//     await User.findByIdAndDelete(teacher.userId);
//     await teacher.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: 'Teacher deleted successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Get students by class
// // @route   GET /api/admin/classes/:class/students
// // @access  Private (Admin)
// export const getStudentsByClass = async (req, res) => {
//   try {
//     const students = await Student.find({ class: req.params.class })
//       .populate('userId', 'email');

//     res.status(200).json({
//       success: true,
//       count: students.length,
//       students
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Add subject/course
// // @route   POST /api/admin/subjects
// // @access  Private (Admin)
// export const addSubject = async (req, res) => {
//   try {
//     const subject = await Subject.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: 'Subject added successfully',
//       subject
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Update subject
// // @route   PUT /api/admin/subjects/:id
// // @access  Private (Admin)
// export const updateSubject = async (req, res) => {
//   try {
//     const subject = await Subject.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!subject) {
//       return res.status(404).json({
//         success: false,
//         message: 'Subject not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Subject updated successfully',
//       subject
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Add teacher payment
// // @route   POST /api/admin/teacher-payment
// // @access  Private (Admin)
// export const addTeacherPayment = async (req, res) => {
//   try {
//     const { teacherId, month, year, amount } = req.body;

//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: 'Teacher not found'
//       });
//     }

//     teacher.paymentDetails.push({
//       month,
//       year,
//       amount,
//       status: 'paid',
//       paidDate: new Date()
//     });

//     await teacher.save();

//     res.status(200).json({
//       success: true,
//       message: 'Payment added successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Create exam
// // @route   POST /api/admin/exams
// // @access  Private (Admin)
// export const createExam = async (req, res) => {
//   try {
//     const exam = await Exam.create({
//       ...req.body,
//       createdBy: req.user.id
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Exam created successfully',
//       exam
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Update exam
// // @route   PUT /api/admin/exams/:id
// // @access  Private (Admin)
// export const updateExam = async (req, res) => {
//   try {
//     const exam = await Exam.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!exam) {
//       return res.status(404).json({
//         success: false,
//         message: 'Exam not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Exam updated successfully',
//       exam
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Get all admission applications
// // @route   GET /api/admin/admissions
// // @access  Private (Admin)
// export const getAllAdmissions = async (req, res) => {
//   try {
//     const admissions = await Admission.find().sort({ submittedDate: -1 });

//     res.status(200).json({
//       success: true,
//       count: admissions.length,
//       admissions
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Approve admission
// // @route   PUT /api/admin/admissions/:id/approve
// // @access  Private (Admin)
// export const approveAdmission = async (req, res) => {
//   try {
//     const { classAssigned, courseId } = req.body;
    
//     const admission = await Admission.findById(req.params.id);
//     if (!admission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admission not found'
//       });
//     }

//     // Generate roll number
//     const rollNumber = await generateRollNumber(classAssigned);
//     const tempPassword = Math.random().toString(36).slice(-8);

//     // Create user
//     const user = await User.create({
//       email: admission.basicDetails.email,
//       password: tempPassword,
//       role: 'student'
//     });

//     // Create student
//     const student = await Student.create({
//       userId: user._id,
//       rollNumber,
//       firstName: admission.basicDetails.firstName,
//       lastName: admission.basicDetails.lastName,
//       class: classAssigned,
//       address: {},
//       courseId,
//       documents: admission.documents
//     });

//     // Update admission status
//     admission.status = 'approved';
//     admission.approvedBy = req.user.id;
//     admission.assignedRollNumber = rollNumber;
    
//     // Generate admission PDF
//     const pdfUrl = await generateAdmissionPDF(admission, student);
//     admission.admissionPdfUrl = pdfUrl;
    
//     await admission.save();

//     res.status(200).json({
//       success: true,
//       message: 'Admission approved successfully',
//       credentials: {
//         email: admission.basicDetails.email,
//         password: tempPassword,
//         rollNumber
//       },
//       admissionPdfUrl: pdfUrl
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Reject admission
// // @route   PUT /api/admin/admissions/:id/reject
// // @access  Private (Admin)
// export const rejectAdmission = async (req, res) => {
//   try {
//     const admission = await Admission.findById(req.params.id);
    
//     if (!admission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admission not found'
//       });
//     }

//     admission.status = 'rejected';
//     await admission.save();

//     res.status(200).json({
//       success: true,
//       message: 'Admission rejected'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Get all applications
// // @route   GET /api/admin/applications
// // @access  Private (Admin)
// export const getAllApplications = async (req, res) => {
//   try {
//     const applications = await Application.find()
//       .populate('studentId', 'firstName lastName rollNumber')
//       .sort({ submittedDate: -1 });

//     res.status(200).json({
//       success: true,
//       count: applications.length,
//       applications
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Respond to application
// // @route   PUT /api/admin/applications/:id
// // @access  Private (Admin)
// export const respondToApplication = async (req, res) => {
//   try {
//     const { status, adminResponse } = req.body;
    
//     const application = await Application.findById(req.params.id);
    
//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     application.status = status;
//     application.adminResponse = adminResponse;
//     application.respondedDate = new Date();
    
//     await application.save();

//     res.status(200).json({
//       success: true,
//       message: 'Application updated successfully',
//       application
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Approve document update request
// // @route   PUT /api/admin/students/:id/approve-document-update
// // @access  Private (Admin)
// export const approveDocumentUpdate = async (req, res) => {
//   try {
//     const { docType } = req.body;
    
//     const student = await Student.findById(req.params.id);
    
//     const docIndex = student.documents.findIndex(d => d.docType === docType);
//     if (docIndex !== -1) {
//       student.documents[docIndex].updatePermission = true;
//       await student.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Document update permission granted'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };




import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Admission from '../models/Admission.js';
import Exam from '../models/Exam.js';
import Subject from '../models/Subject.js';
import Application from '../models/Application.js';
import { generateAdmissionPDF } from '../utils/pdfGenerator.js';

// Generate unique roll number
const generateRollNumber = async (className) => {
  const year = new Date().getFullYear();
  const count = await Student.countDocuments({ class: className });
  return `${year}${className}${String(count + 1).padStart(4, '0')}`;
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('userId', 'email')
      .populate('courseId');

    res.status(200).json({
      success: true,
      count: students.length,
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

// @desc    Get single student
// @route   GET /api/admin/students/:id
// @access  Private (Admin)
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId')
      .populate('courseId')
      .populate('attendanceCriteria.subjectId')
      .populate('attendanceCriteria.teacherId');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
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

// @desc    Add new student
// @route   POST /api/admin/students
// @access  Private (Admin)
export const addStudent = async (req, res) => {
  try {
    const { email, firstName, lastName, className, address, courseId } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const rollNumber = await generateRollNumber(className);

    // Create user
    user = await User.create({
      email,
      password: tempPassword,
      role: 'student'
    });

    // Create student
    const student = await Student.create({
      userId: user._id,
      rollNumber,
      firstName,
      lastName,
      class: className,
      address,
      courseId
    });

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      student,
      credentials: {
        email,
        password: tempPassword,
        rollNumber
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

// @desc    Update student
// @route   PUT /api/admin/students/:id
// @access  Private (Admin)
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
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

// @desc    Delete student
// @route   DELETE /api/admin/students/:id
// @access  Private (Admin)
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await User.findByIdAndDelete(student.userId);
    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private (Admin)
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('userId', 'email')
      .populate('subjects');

    res.status(200).json({
      success: true,
      count: teachers.length,
      teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add new teacher
// @route   POST /api/admin/teachers
// @access  Private (Admin)
export const addTeacher = async (req, res) => {
  try {
    const { email, firstName, lastName, subjects, classes, profile } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const teacherId = 'T' + Date.now();

    user = await User.create({
      email,
      password: tempPassword,
      role: 'teacher'
    });

    const teacher = await Teacher.create({
      userId: user._id,
      teacherId,
      firstName,
      lastName,
      subjects,
      classes,
      profile
    });

    res.status(201).json({
      success: true,
      message: 'Teacher added successfully',
      teacher,
      credentials: {
        email,
        password: tempPassword,
        teacherId
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

// @desc    Update teacher
// @route   PUT /api/admin/teachers/:id
// @access  Private (Admin)
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Teacher updated successfully',
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

// @desc    Delete teacher
// @route   DELETE /api/admin/teachers/:id
// @access  Private (Admin)
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    await User.findByIdAndDelete(teacher.userId);
    await teacher.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Teacher deleted successfully'
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
// @route   GET /api/admin/classes/:class/students
// @access  Private (Admin)
export const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.class })
      .populate('userId', 'email');

    res.status(200).json({
      success: true,
      count: students.length,
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

// @desc    Add subject/course
// @route   POST /api/admin/subjects
// @access  Private (Admin)
export const addSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Subject added successfully',
      subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update subject
// @route   PUT /api/admin/subjects/:id
// @access  Private (Admin)
export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subject updated successfully',
      subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add teacher payment
// @route   POST /api/admin/teacher-payment
// @access  Private (Admin)
export const addTeacherPayment = async (req, res) => {
  try {
    const { teacherId, month, year, amount } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    teacher.paymentDetails.push({
      month,
      year,
      amount,
      status: 'paid',
      paidDate: new Date()
    });

    await teacher.save();

    res.status(200).json({
      success: true,
      message: 'Payment added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create exam
// @route   POST /api/admin/exams
// @access  Private (Admin)
export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update exam
// @route   PUT /api/admin/exams/:id
// @access  Private (Admin)
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all admission applications
// @route   GET /api/admin/admissions
// @access  Private (Admin)
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ submittedDate: -1 });

    res.status(200).json({
      success: true,
      count: admissions.length,
      admissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Approve admission
// @route   PUT /api/admin/admissions/:id/approve
// @access  Private (Admin)
export const approveAdmission = async (req, res) => {
  try {
    const { classAssigned, courseId } = req.body;
    
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    // Generate roll number
    const rollNumber = await generateRollNumber(classAssigned);
    const tempPassword = Math.random().toString(36).slice(-8);

    // Create user
    const user = await User.create({
      email: admission.basicDetails.email,
      password: tempPassword,
      role: 'student'
    });

    // Create student
    const student = await Student.create({
      userId: user._id,
      rollNumber,
      firstName: admission.basicDetails.firstName,
      lastName: admission.basicDetails.lastName,
      class: classAssigned,
      address: {},
      courseId,
      documents: admission.documents
    });

    // Update admission status
    admission.status = 'approved';
    admission.approvedBy = req.user.id;
    admission.assignedRollNumber = rollNumber;
    
    // Generate admission PDF (you'll implement this later)
    // const pdfUrl = await generateAdmissionPDF(admission, student);
    // admission.admissionPdfUrl = pdfUrl;
    
    await admission.save();

    res.status(200).json({
      success: true,
      message: 'Admission approved successfully',
      credentials: {
        email: admission.basicDetails.email,
        password: tempPassword,
        rollNumber
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

// @desc    Reject admission
// @route   PUT /api/admin/admissions/:id/reject
// @access  Private (Admin)
export const rejectAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    admission.status = 'rejected';
    await admission.save();

    res.status(200).json({
      success: true,
      message: 'Admission rejected'
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
// @route   GET /api/admin/applications
// @access  Private (Admin)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('studentId', 'firstName lastName rollNumber')
      .sort({ submittedDate: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
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

// @desc    Respond to application
// @route   PUT /api/admin/applications/:id
// @access  Private (Admin)
export const respondToApplication = async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    application.adminResponse = adminResponse;
    application.respondedDate = new Date();
    
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
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

// @desc    Approve document update request
// @route   PUT /api/admin/students/:id/approve-document-update
// @access  Private (Admin)
export const approveDocumentUpdate = async (req, res) => {
  try {
    const { docType } = req.body;
    
    const student = await Student.findById(req.params.id);
    
    const docIndex = student.documents.findIndex(d => d.docType === docType);
    if (docIndex !== -1) {
      student.documents[docIndex].updatePermission = true;
      await student.save();
    }

    res.status(200).json({
      success: true,
      message: 'Document update permission granted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
