import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="teacher" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {user.email}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/teacher/profile" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">👤</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">My Profile</h2>
            <p className="text-gray-600">View and update your profile</p>
          </Link>

          <Link to="/teacher/students" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">👨‍🎓</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Students</h2>
            <p className="text-gray-600">Manage student attendance criteria</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
