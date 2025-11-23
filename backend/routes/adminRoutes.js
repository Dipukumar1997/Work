import express from 'express';
import {
  searchStudent,
  updateStudentPermissions,
  
  getAllStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getStudentsByClass,
  addSubject,
  updateSubject,
  addTeacherPayment,
  createExam,
  updateExam,
  getAllAdmissions,
  approveAdmission,
  rejectAdmission,
  getAllApplications,
  respondToApplication,
  approveDocumentUpdate
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/students/search', searchStudent);
router.put('/students/:id/permissions', updateStudentPermissions);

// Note: Remove authentication middleware temporarily to test
// We'll add it back after confirming routes work

// Student routes
router.get('/students', getAllStudents);
router.get('/students/:id', getStudent);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.get('/classes/:class/students', getStudentsByClass);
router.put('/students/:id/approve-document-update', approveDocumentUpdate);

// Teacher routes
router.get('/teachers', getAllTeachers);
router.post('/teachers', addTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);
router.post('/teacher-payment', addTeacherPayment);

// Subject routes
router.post('/subjects', addSubject);
router.put('/subjects/:id', updateSubject);

// Exam routes
router.post('/exams', createExam);
router.put('/exams/:id', updateExam);

// Admission routes
router.get('/admissions', getAllAdmissions);
router.put('/admissions/:id/approve', approveAdmission);
router.put('/admissions/:id/reject', rejectAdmission);

// Application routes
router.get('/applications', getAllApplications);
router.put('/applications/:id', respondToApplication);

export default router;
