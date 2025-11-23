// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
  
//   const [userType, setUserType] = useState('student'); // student, teacher, admin
//   const [credentials, setCredentials] = useState({
//     identifier: '', // Can be email OR roll number
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // For students, send roll number; for others, send email
//       const loginData = {
//         [userType === 'student' ? 'rollNumber' : 'email']: credentials.identifier,
//         password: credentials.password
//       };

//       const response = await login(loginData);
      
//       // Redirect based on role
//       const role = response.user.role;
//       navigate(`/${role}/dashboard`);
      
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formCard}>
//         <h2 style={styles.title}>Login to ARS Inter College</h2>
        
//         {/* User Type Selector */}
//         <div style={styles.tabContainer}>
//           <button
//             type="button"
//             style={{...styles.tab, ...(userType === 'student' ? styles.activeTab : {})}}
//             onClick={() => setUserType('student')}
//           >
//             👨‍🎓 Student
//           </button>
//           <button
//             type="button"
//             style={{...styles.tab, ...(userType === 'teacher' ? styles.activeTab : {})}}
//             onClick={() => setUserType('teacher')}
//           >
//             👨‍🏫 Teacher
//           </button>
//           <button
//             type="button"
//             style={{...styles.tab, ...(userType === 'admin' ? styles.activeTab : {})}}
//             onClick={() => setUserType('admin')}
//           >
//             👤 Admin
//           </button>
//         </div>

//         {error && (
//           <div style={styles.error}>
//             ⚠️ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>
//               {userType === 'student' ? 'Roll Number' : 'Email'}
//             </label>
//             <input
//               type="text"
//               value={credentials.identifier}
//               onChange={(e) => setCredentials({...credentials, identifier: e.target.value})}
//               style={styles.input}
//               placeholder={
//                 userType === 'student' 
//                   ? 'Enter your roll number (e.g., 202510000001)' 
//                   : 'Enter your email'
//               }
//               required
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <input
//               type="password"
//               value={credentials.password}
//               onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//               style={styles.input}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button 
//             type="submit" 
//             style={styles.submitBtn}
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : '🔐 Login'}
//           </button>
//         </form>

//         <div style={styles.footer}>
//           <a href="/" style={styles.link}>← Back to Home</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   formCard: {
//     background: '#fff',
//     borderRadius: 20,
//     padding: 40,
//     width: '100%',
//     maxWidth: 450,
//     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#333',
//   },
//   tabContainer: {
//     display: 'flex',
//     gap: 10,
//     marginBottom: 25,
//   },
//   tab: {
//     flex: 1,
//     padding: '12px 0',
//     border: '2px solid #e0e0e0',
//     background: '#f5f5f5',
//     borderRadius: 10,
//     cursor: 'pointer',
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#666',
//     transition: 'all 0.3s',
//   },
//   activeTab: {
//     background: '#667eea',
//     color: '#fff',
//     border: '2px solid #667eea',
//   },
//   error: {
//     background: '#fee',
//     color: '#c33',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//     fontSize: 14,
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 20,
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   input: {
//     padding: '14px 16px',
//     fontSize: 16,
//     border: '2px solid #e0e0e0',
//     borderRadius: 10,
//     outline: 'none',
//     transition: 'border 0.3s',
//   },
//   submitBtn: {
//     padding: '16px',
//     fontSize: 18,
//     fontWeight: 'bold',
//     background: '#667eea',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 10,
//     cursor: 'pointer',
//     marginTop: 10,
//     transition: 'transform 0.2s',
//   },
//   footer: {
//     marginTop: 25,
//     textAlign: 'center',
//   },
//   link: {
//     color: '#667eea',
//     textDecoration: 'none',
//     fontWeight: 'bold',
//   },
// };

// export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [userType, setUserType] = useState('student');
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare login data based on user type
      const loginData = userType === 'student' 
        ? { rollNumber: credentials.identifier, password: credentials.password }
        : { email: credentials.identifier, password: credentials.password };

      console.log('Attempting login with:', loginData); // Debug log

      // Call login function
      const response = await login(loginData);
      
      console.log('Login successful:', response); // Debug log
      
      // Redirect based on role
      const role = response.user.role;
      navigate(`/${role}/dashboard`);
      
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Login to ARS Inter College</h2>
        
        {/* User Type Tabs */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            style={{...styles.tab, ...(userType === 'student' ? styles.activeTab : {})}}
            onClick={() => setUserType('student')}
          >
            👨‍🎓 Student
          </button>
          <button
            type="button"
            style={{...styles.tab, ...(userType === 'teacher' ? styles.activeTab : {})}}
            onClick={() => setUserType('teacher')}
          >
            👨‍🏫 Teacher
          </button>
          <button
            type="button"
            style={{...styles.tab, ...(userType === 'admin' ? styles.activeTab : {})}}
            onClick={() => setUserType('admin')}
          >
            👤 Admin
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              {userType === 'student' ? 'Roll Number' : 'Email'}
            </label>
            <input
              type="text"
              value={credentials.identifier}
              onChange={(e) => setCredentials({...credentials, identifier: e.target.value})}
              style={styles.input}
              placeholder={
                userType === 'student' 
                  ? 'Enter your roll number' 
                  : 'Enter your email'
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? '⏳ Logging in...' : '🔐 Login'}
          </button>
        </form>

        <div style={styles.footer}>
          <a href="/" style={styles.link}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

// Styles (same as before)
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formCard: {
    background: '#fff',
    borderRadius: 20,
    padding: 40,
    width: '100%',
    maxWidth: 450,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  tabContainer: {
    display: 'flex',
    gap: 10,
    marginBottom: 25,
  },
  tab: {
    flex: 1,
    padding: '12px 0',
    border: '2px solid #e0e0e0',
    background: '#f5f5f5',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    transition: 'all 0.3s',
  },
  activeTab: {
    background: '#667eea',
    color: '#fff',
    border: '2px solid #667eea',
  },
  error: {
    background: '#fee',
    color: '#c33',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    padding: '14px 16px',
    fontSize: 16,
    border: '2px solid #e0e0e0',
    borderRadius: 10,
    outline: 'none',
  },
  submitBtn: {
    padding: '16px',
    fontSize: 18,
    fontWeight: 'bold',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    marginTop: 10,
  },
  footer: {
    marginTop: 25,
    textAlign: 'center',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;
