import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {user.email}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/student/profile" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">👤</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">My Profile</h2>
            <p className="text-gray-600">View and update your profile</p>
          </Link>

          <Link to="/student/documents" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">📄</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Documents</h2>
            <p className="text-gray-600">Manage your documents</p>
          </Link>

          <Link to="/student/exams" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Exams</h2>
            <p className="text-gray-600">View exams and admit cards</p>
          </Link>

          <Link to="/student/payment" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">💳</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Payments</h2>
            <p className="text-gray-600">Payment history and new payments</p>
          </Link>

          <Link to="/student/applications" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">✉️</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Applications</h2>
            <p className="text-gray-600">Send applications to admin</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
