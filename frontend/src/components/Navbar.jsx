import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            ARS Inter College
          </Link>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to={`/${user.role}/dashboard`} className="hover:text-blue-200">
                  Dashboard
                </Link>
                <span className="text-sm">({user.email})</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
