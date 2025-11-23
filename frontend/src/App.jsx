import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDetail from './pages/Admin/StudentDetail';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdmissionForm from './pages/Admission/AdmissionForm';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import Students from './pages/Admin/Students';
import Teachers from './pages/Admin/Teachers';
import Admissions from './pages/Admin/Admissions';
import Subjects from './pages/Admin/Subjects';
import Exams from './pages/Admin/Exams';
import AdminApplications from './pages/Admin/Applications'; // Renamed

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard';
import StudentProfile from './pages/Student/Profile';
import Documents from './pages/Student/Documents';
import StudentExams from './pages/Student/Exams';
import Payment from './pages/Student/Payment';
import StudentApplications from './pages/Student/Applications'; // Renamed

// Teacher Pages
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherProfile from './pages/Teacher/Profile';
import TeacherStudents from './pages/Teacher/Students';
import PaymentSuccess from './pages/Student/PaymentSuccess';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admission" element={<AdmissionForm />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/student/:id"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StudentDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/teachers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Teachers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admissions"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subjects"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Subjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Exams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApplications />
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/documents"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/exams"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentExams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/payment"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/applications"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentApplications />
              </ProtectedRoute>
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route
            path="/teacher/profile"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherStudents />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
