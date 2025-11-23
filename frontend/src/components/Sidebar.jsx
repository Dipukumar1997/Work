import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const adminLinks = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/admin/students', name: 'Students', icon: '👨‍🎓' },
    { path: '/admin/teachers', name: 'Teachers', icon: '👨‍🏫' },
    { path: '/admin/subjects', name: 'Subjects', icon: '📚' },
    { path: '/admin/admissions', name: 'Admissions', icon: '📝' },
    { path: '/admin/exams', name: 'Exams', icon: '📋' },
  ];

  const studentLinks = [
    { path: '/student/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/student/profile', name: 'Profile', icon: '👤' },
    { path: '/student/documents', name: 'Documents', icon: '📄' },
    { path: '/student/exams', name: 'Exams', icon: '📋' },
    { path: '/student/payment', name: 'Payment', icon: '💳' },
    { path: '/student/applications', name: 'Applications', icon: '✉️' },
  ];

  const teacherLinks = [
    { path: '/teacher/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/teacher/profile', name: 'Profile', icon: '👤' },
    { path: '/teacher/students', name: 'Students', icon: '👨‍🎓' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'student' ? studentLinks : teacherLinks;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 capitalize">{role} Panel</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded transition ${
                location.pathname === link.path
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
