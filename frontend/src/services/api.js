import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth APIs ---
export const authAPI = {
  registerAdmin: (data) => api.post('/auth/register-admin', data),
  login: (data) => api.post('/auth/login', data),
  verify: () => api.get('/auth/verify'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// --- Admin APIs ---
export const adminAPI = {
  // Students
  getAllStudents: () => api.get('/admin/students'),
  getStudent: (id) => api.get(`/admin/students/${id}`),
  addStudent: (data) => api.post('/admin/students', data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),

  // Teachers
  getAllTeachers: () => api.get('/admin/teachers'),
  addTeacher: (data) => api.post('/admin/teachers', data),
  updateTeacher: (id, data) => api.put(`/admin/teachers/${id}`, data),
  deleteTeacher: (id) => api.delete(`/admin/teachers/${id}`),

  // Subjects & Exams
  addSubject: (data) => api.post('/admin/subjects', data),
  createExam: (data) => api.post('/admin/exams', data),
  updateExam: (id, data) => api.put(`/admin/exams/${id}`, data),

  // Admissions
  getAllAdmissions: () => api.get('/admin/admissions'),
  approveAdmission: (id, data) => api.put(`/admin/admissions/${id}/approve`, data),
  rejectAdmission: (id) => api.put(`/admin/admissions/${id}/reject`),

  // Applications
  getAllApplications: () => api.get('/admin/applications'),
  respondToApplication: (id, data) => api.put(`/admin/applications/${id}`, data),
};

// --- Student APIs ---
export const studentAPI = {
  getProfile: () => api.get('/student/profile'),
  getDocuments: () => api.get('/student/documents'),
  getPaymentHistory: () => api.get('/student/payment-history'),
  makePayment: (data) => api.post('/student/payment', data),
  getExams: () => api.get('/student/exams'),
  downloadAdmitCard: (examId) => api.get(`/student/admit-card/${examId}`),
  getMarksheets: () => api.get('/student/marksheets'),
  sendApplication: (data) => api.post('/student/application', data),
  getApplications: () => api.get('/student/applications'),
};

// --- Teacher APIs ---
export const teacherAPI = {
  getProfile: () => api.get('/teacher/profile'),
  updateProfile: (data) => api.put('/teacher/profile', data),
  getPaymentDetails: () => api.get('/teacher/payment-details'),
  getClasses: () => api.get('/teacher/classes'),
  getStudentsByClass: (classId) => api.get(`/teacher/students/${classId}`),
  markAttendanceCriteria: (data) => api.put('/teacher/attendance-criteria', data),
};

// --- Admission/open APIs ---
export const admissionAPI = {
  submitBasicDetails: (data) => api.post('/admission/basic-details', data),
  uploadDocuments: (data) => api.post('/admission/upload-documents', data),
  processPayment: (data) => api.post('/admission/payment', data),
  getStatus: (applicationId) => api.get(`/admission/status/${applicationId}`),
};

// --- Home/APIs (Public) ---
export const homeAPI = {
  getCampusImages: () => api.get('/home/campus-images'),
  getToppers: () => api.get('/home/toppers'),
  getTeachers: () => api.get('/home/teachers'),
  getEvents: () => api.get('/home/events'),
};

export default api;
