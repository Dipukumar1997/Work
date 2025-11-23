// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
  
//   const [userType, setUserType] = useState('student');
//   const [credentials, setCredentials] = useState({
//     identifier: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Prepare login data based on user type
//       const loginData = userType === 'student' 
//         ? { rollNumber: credentials.identifier, password: credentials.password }
//         : { email: credentials.identifier, password: credentials.password };

//       console.log('Attempting login with:', loginData); // Debug log

//       // Call login function
//       const response = await login(loginData);
      
//       console.log('Login successful:', response); // Debug log
      
//       // Redirect based on role
//       const role = response.user.role;
//       navigate(`/${role}/dashboard`);
      
//     } catch (err) {
//       console.error('Login error:', err); // Debug log
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formCard}>
//         <h2 style={styles.title}>Login to ARS Inter College</h2>
        
//         {/* User Type Tabs */}
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

//         {/* Error Message */}
//         {error && (
//           <div style={styles.error}>
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Login Form */}
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
//                   ? 'Enter your roll number' 
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
//             {loading ? '⏳ Logging in...' : '🔐 Login'}
//           </button>
//         </form>

//         <div style={styles.footer}>
//           <a href="/" style={styles.link}>← Back to Home</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles (same as before)
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


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [loginType, setLoginType] = useState('student');
//   const [credentials, setCredentials] = useState({ rollNumber: '', email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const loginData = loginType === 'student' 
//         ? { rollNumber: credentials.rollNumber, password: credentials.password }
//         : { email: credentials.email, password: credentials.password };

//       await login(loginData);
      
//       // Navigate based on role
//       const userRole = localStorage.getItem('userRole');
//       if (userRole === 'admin') navigate('/admin/dashboard');
//       else if (userRole === 'teacher') navigate('/teacher/dashboard');
//       else navigate('/student/dashboard');
//     } catch (error) {
//       alert('Login failed: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>ARS INTER COLLEGE</h1>
//           <p style={styles.subtitle}>Excellence in Education</p>
//         </div>

//         <div style={styles.loginBox}>
//           <h2 style={styles.loginTitle}>LOGIN</h2>

//           <form onSubmit={handleSubmit} style={styles.form}>
//             {/* Login Type Tabs */}
//             <div style={styles.tabs}>
//               <button
//                 type="button"
//                 onClick={() => setLoginType('student')}
//                 style={{
//                   ...styles.tab,
//                   background: loginType === 'student' ? '#1e5a8e' : '#f0f0f0',
//                   color: loginType === 'student' ? '#fff' : '#333'
//                 }}
//               >
//                 Student
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setLoginType('admin')}
//                 style={{
//                   ...styles.tab,
//                   background: loginType === 'admin' ? '#1e5a8e' : '#f0f0f0',
//                   color: loginType === 'admin' ? '#fff' : '#333'
//                 }}
//               >
//                 Admin/Teacher
//               </button>
//             </div>

//             {/* Username/Roll Number Input */}
//             <div style={styles.inputGroup}>
//               <input
//                 type="text"
//                 placeholder={loginType === 'student' ? 'Enter Roll Number' : 'Enter Email'}
//                 value={loginType === 'student' ? credentials.rollNumber : credentials.email}
//                 onChange={(e) => setCredentials({
//                   ...credentials,
//                   [loginType === 'student' ? 'rollNumber' : 'email']: e.target.value
//                 })}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div style={styles.inputGroup}>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             {/* Login Button */}
//             <button type="submit" disabled={loading} style={styles.loginBtn}>
//               {loading ? 'Logging in...' : 'LOGIN'}
//             </button>

//             {/* Forgot Password Link */}
//             <a href="/forgot-password" style={styles.forgotLink}>Forgot Password?</a>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #1e5a8e 0%, #2980b9 100%)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: 'Arial, sans-serif',
//   },
//   container: {
//     width: '100%',
//     maxWidth: 450,
//     padding: 20,
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     margin: 0,
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     margin: 0,
//     opacity: 0.9,
//   },
//   loginBox: {
//     background: '#fff',
//     borderRadius: 8,
//     padding: 40,
//     boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//   },
//   loginTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   tabs: {
//     display: 'flex',
//     gap: 10,
//     marginBottom: 25,
//   },
//   tab: {
//     flex: 1,
//     padding: 12,
//     border: 'none',
//     borderRadius: 6,
//     fontSize: 14,
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     transition: 'all 0.3s',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 14,
//     fontSize: 15,
//     border: '2px solid #ddd',
//     borderRadius: 6,
//     outline: 'none',
//     transition: 'border 0.3s',
//   },
//   loginBtn: {
//     padding: 14,
//     background: '#1e5a8e',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 6,
//     fontSize: 16,
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     transition: 'background 0.3s',
//     marginTop: 10,
//   },
//   forgotLink: {
//     textAlign: 'center',
//     display: 'block',
//     marginTop: 20,
//     color: '#1e5a8e',
//     fontSize: 14,
//     textDecoration: 'none',
//   },
// };

// export default Login;



// from her 


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Determine if username is roll number (student) or email (admin/teacher)
//       const isRollNumber = /^\d+$/.test(credentials.username);
      
//       const loginData = isRollNumber 
//         ? { rollNumber: credentials.username, password: credentials.password }
//         : { email: credentials.username, password: credentials.password };

//       await login(loginData);
      
//       // Navigate based on role
//       const userRole = localStorage.getItem('userRole');
//       if (userRole === 'admin') navigate('/admin/dashboard');
//       else if (userRole === 'teacher') navigate('/teacher/dashboard');
//       else navigate('/student/dashboard');
//     } catch (error) {
//       alert('Login failed: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <img src="/logo.png" alt="Logo" style={styles.logo} onError={(e) => e.target.style.display = 'none'} />
//           <div>
//             <h1 style={styles.title}>National Institute of Technology Mizoram</h1>
//             <h2 style={styles.titleHindi}>राष्ट्रीय प्रौद्योगिकी संस्थान मिजोरम</h2>
//             <p style={styles.subtitle}>(An Institution of National Importance under Ministry of Education, Govt. of India)</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - 3 Columns */}
//       <div style={styles.container}>
//         {/* Left Column - Latest Update */}
//         <div style={styles.column}>
//           <div style={styles.boxHeader}>LATEST UPDATE</div>
//           <div style={styles.box}>
//             <a href="#" style={styles.link}>ID CARD FOR B.TECH 2025-26 ADM. BATCH STUDENT...</a>
//           </div>
//         </div>

//         {/* Center Column - Login */}
//         <div style={styles.column}>
//           <div style={styles.boxHeader}>LOGIN</div>
//           <div style={styles.box}>
//             <form onSubmit={handleSubmit} style={styles.form}>
//               <input
//                 type="text"
//                 placeholder="Please enter user name."
//                 value={credentials.username}
//                 onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                 style={styles.input}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Please enter password."
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 style={styles.input}
//                 required
//               />
//               <button type="submit" disabled={loading} style={styles.loginBtn}>
//                 {loading ? 'Logging in...' : 'LOGIN'}
//               </button>
//               <a href="/forgot-password" style={styles.forgotLink}>Forgot Password?</a>
//             </form>
//           </div>
//         </div>

//         {/* Right Column - News & Events */}
//         <div style={styles.column}>
//           <div style={styles.boxHeader}>NEWS & EVENTS</div>
//           <div style={styles.box}>
//             <div style={styles.otherInfo}>OTHER INFORMATION</div>
//             <p style={styles.infoText}>To register in Training and Placement click on <a href="#" style={styles.link}>T&P Sign Up</a></p>
//             <p style={styles.infoText}>Company Registration <a href="#" style={styles.link}>Company Register</a></p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={styles.footer}>
//         <p style={styles.footerText}>Developed By : Masters Software, Nagpur</p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     minHeight: '100vh',
//     background: '#e0e0e0',
//     fontFamily: 'Arial, sans-serif',
//   },
//   header: {
//     background: 'linear-gradient(to right, #1565c0, #1976d2)',
//     padding: '20px',
//   },
//   headerContent: {
//     maxWidth: 1200,
//     margin: '0 auto',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 20,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     margin: 0,
//   },
//   titleHindi: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     margin: '5px 0',
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#fff',
//     margin: 0,
//   },
//   container: {
//     maxWidth: 1200,
//     margin: '30px auto',
//     padding: '0 20px',
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gap: 20,
//   },
//   column: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   boxHeader: {
//     background: '#1565c0',
//     color: '#fff',
//     padding: '12px 15px',
//     fontSize: 15,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   box: {
//     background: '#fff',
//     padding: 25,
//     minHeight: 250,
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 15,
//   },
//   input: {
//     padding: 12,
//     fontSize: 14,
//     border: '1px solid #ccc',
//     borderRadius: 4,
//     outline: 'none',
//   },
//   loginBtn: {
//     padding: 12,
//     background: '#1565c0',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 4,
//     fontSize: 16,
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     marginTop: 10,
//   },
//   forgotLink: {
//     textAlign: 'center',
//     color: '#1565c0',
//     fontSize: 14,
//     textDecoration: 'none',
//     marginTop: 10,
//   },
//   link: {
//     color: '#1565c0',
//     textDecoration: 'none',
//     fontSize: 13,
//     display: 'block',
//     marginBottom: 10,
//   },
//   otherInfo: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginBottom: 15,
//     color: '#333',
//   },
//   infoText: {
//     fontSize: 13,
//     color: '#555',
//     marginBottom: 10,
//   },
//   footer: {
//     background: '#1a237e',
//     padding: '15px',
//     textAlign: 'center',
//     position: 'fixed',
//     bottom: 0,
//     width: '100%',
//   },
//   footerText: {
//     color: '#fff',
//     fontSize: 13,
//     margin: 0,
//   },
// };

// export default Login;



//from here 2

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '', captcha: '' });
//   const [generatedCaptcha, setGeneratedCaptcha] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Generate captcha on mount
//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const generateCaptcha = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let captcha = '';
//     for (let i = 0; i < 6; i++) {
//       captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setGeneratedCaptcha(captcha);
//     setCredentials({ ...credentials, captcha: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate captcha
//     if (credentials.captcha !== generatedCaptcha) {
//       alert('❌ Invalid CAPTCHA. Please try again.');
//       generateCaptcha();
//       return;
//     }

//     setLoading(true);

//     try {
//       // Determine if username is roll number (student) or email (admin/teacher)
//       const isRollNumber = /^\d+$/.test(credentials.username);
      
//       const loginData = isRollNumber 
//         ? { rollNumber: credentials.username, password: credentials.password }
//         : { email: credentials.username, password: credentials.password };

//       await login(loginData);
      
//       // Navigate based on role
//       const userRole = localStorage.getItem('userRole');
//       if (userRole === 'admin') navigate('/admin/dashboard');
//       else if (userRole === 'teacher') navigate('/teacher/dashboard');
//       else navigate('/student/dashboard');
//     } catch (error) {
//       alert('Login failed: ' + (error.response?.data?.message || error.message));
//       generateCaptcha(); // Regenerate captcha on failed login
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.logoCircle}>🏫</div>
//           <div>
//             <h1 style={styles.title}>ARS INTER COLLEGE</h1>
//             <h2 style={styles.titleHindi}>एआरएस इंटर कॉलेज</h2>
//             <p style={styles.subtitle}>(An Institution of Excellence under Bihar Education Board)</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - 3 Columns */}
//       <div style={styles.container}>
//         {/* Left Column - Latest Update */}
//         <div style={styles.column}>
//           <div style={styles.boxHeader}>LATEST UPDATE</div>
//           <div style={styles.box}>
//             <a href="#" style={styles.link}>ID CARD FOR CLASS 10 & 12 2025-26 BATCH STUDENT...</a>
//             <a href="#" style={styles.link}>ADMISSION OPEN FOR SESSION 2025-26...</a>
//             <a href="#" style={styles.link}>ANNUAL EXAMINATION SCHEDULE 2025...</a>
//           </div>
//         </div>

//         {/* Center Column - Login */}
//         <div style={styles.column}>
//           <div style={styles.boxHeader}>LOGIN</div>
//           <div style={styles.box}>
//             <form onSubmit={handleSubmit} style={styles.form}>
//               {/* Username with icon */}
//               <div style={styles.inputWrapper}>
//                 <input
//                   type="text"
//                   placeholder="Please enter user name."
//                   value={credentials.username}
//                   onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//                 <span style={styles.icon}>👤</span>
//               </div>

//               {/* Password with icon */}
//               <div style={styles.inputWrapper}>
//                 <input
//                   type="password"
//                   placeholder="Please enter password."
//                   value={credentials.password}
//                   onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//                 <span style={styles.icon}>🔒</span>
//               </div>

//               {/* Captcha Section */}
//               <div style={styles.captchaContainer}>
//                 <div style={styles.captchaBox}>
//                   <span style={styles.captchaText}>{generatedCaptcha}</span>
//                 </div>
//                 <button 
//                   type="button" 
//                   onClick={generateCaptcha} 
//                   style={styles.refreshBtn}
//                   title="Refresh Captcha"
//                 >
//                   🔄
//                 </button>
//               </div>

//               {/* Captcha Input */}
//               <input
//                 type="text"
//                 placeholder="ENTER CAPTCHA"
//                 value={credentials.captcha}
//                 onChange={(e) => setCredentials({ ...credentials, captcha: e.target.value })}
//                 style={styles.input}
//                 required
//               />

//               {/* Login Button */}
//               <button type="submit" disabled={loading} style={styles.loginBtn}>
//                 {loading ? 'Logging in...' : 'LOGIN'}
//               </button>

//               <a href="/forgot-password" style={styles.forgotLink}>Forgot Password?</a>
//             </form>
//           </div>
//         </div>

//         {/* Right Column - News & Events */}
//         <div style={styles.column}>
//           <div style={styles.boxHeader}>NEWS & EVENTS</div>
//           <div style={styles.box}>
//             <div style={styles.otherInfo}>OTHER INFORMATION</div>
//             <p style={styles.infoText}>
//               To register in Training and Placement click on{' '}
//               <a href="#" style={styles.linkBlue}>T&P Sign Up</a>
//             </p>
//             <p style={styles.infoText}>
//               Company Registration{' '}
//               <a href="#" style={styles.linkBlue}>Company Register</a>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={styles.footer}>
//         <p style={styles.footerText}>Developed By : Masters Software, Nagpur</p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     minHeight: '100vh',
//     background: '#e0e0e0',
//     fontFamily: 'Arial, sans-serif',
//   },
//   header: {
//     background: 'linear-gradient(to right, #1565c0, #1976d2)',
//     padding: '20px',
//   },
//   headerContent: {
//     maxWidth: 1200,
//     margin: '0 auto',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 20,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: '50%',
//     background: '#fff',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: 40,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     margin: 0,
//   },
//   titleHindi: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     margin: '5px 0',
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#fff',
//     margin: 0,
//   },
//   container: {
//     maxWidth: 1200,
//     margin: '30px auto',
//     padding: '0 20px',
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     gap: 20,
//   },
//   column: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   boxHeader: {
//     background: '#1565c0',
//     color: '#fff',
//     padding: '12px 15px',
//     fontSize: 15,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   box: {
//     background: '#fff',
//     padding: 25,
//     minHeight: 300,
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 15,
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   input: {
//     width: '100%',
//     padding: '12px 40px 12px 12px',
//     fontSize: 14,
//     border: '1px solid #ccc',
//     borderRadius: 4,
//     outline: 'none',
//   },
//   icon: {
//     position: 'absolute',
//     right: 12,
//     top: '50%',
//     transform: 'translateY(-50%)',
//     fontSize: 18,
//   },
//   captchaContainer: {
//     display: 'flex',
//     gap: 10,
//     alignItems: 'center',
//   },
//   captchaBox: {
//     flex: 1,
//     padding: 15,
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     borderRadius: 4,
//     textAlign: 'center',
//     fontFamily: 'monospace',
//     letterSpacing: 5,
//     userSelect: 'none',
//   },
//   captchaText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
//   },
//   refreshBtn: {
//     padding: '10px 15px',
//     background: '#1565c0',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 4,
//     fontSize: 18,
//     cursor: 'pointer',
//   },
//   loginBtn: {
//     padding: 12,
//     background: '#1565c0',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 4,
//     fontSize: 16,
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     marginTop: 10,
//   },
//   forgotLink: {
//     textAlign: 'center',
//     color: '#1565c0',
//     fontSize: 14,
//     textDecoration: 'none',
//     marginTop: 10,
//   },
//   link: {
//     color: '#333',
//     textDecoration: 'none',
//     fontSize: 13,
//     display: 'block',
//     marginBottom: 10,
//     lineHeight: 1.6,
//   },
//   linkBlue: {
//     color: '#1565c0',
//     textDecoration: 'none',
//   },
//   otherInfo: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginBottom: 15,
//     color: '#333',
//   },
//   infoText: {
//     fontSize: 13,
//     color: '#555',
//     marginBottom: 10,
//     lineHeight: 1.6,
//   },
//   footer: {
//     background: '#1a237e',
//     padding: '15px',
//     textAlign: 'center',
//     marginTop: 40,
//   },
//   footerText: {
//     color: '#fff',
//     fontSize: 13,
//     margin: 0,
//   },
// };

// export default Login;

//from 3 

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', captcha: '' });
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
    setCredentials({ ...credentials, captcha: '' });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(" credentials.captcha " + credentials.captcha)
  //   console.log("generatedCaptcha " + generatedCaptcha)
  //   if (credentials.captcha !== generatedCaptcha) {
  //     alert('❌ Invalid CAPTCHA. Please try again.');
  //     generateCaptcha();
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const isRollNumber = /^\d+$/.test(credentials.username);
  //     const loginData = isRollNumber 
  //       ? { rollNumber: credentials.username, password: credentials.password }
  //       : { email: credentials.username, password: credentials.password };

  //     await login(loginData);
      
  //     const userRole = localStorage.getItem('userRole');
  //     if (userRole === 'admin') navigate('/admin/dashboard');
  //     else if (userRole === 'teacher') navigate('/teacher/dashboard');
  //     else navigate('/student/dashboard');
  //   } catch (error) {
  //     alert('Login failed: ' + (error.response?.data?.message || error.message));
  //     generateCaptcha();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (credentials.captcha !== generatedCaptcha) {
    alert('❌ Invalid CAPTCHA. Please try again.');
    generateCaptcha();
    return;
  }

  setLoading(true);
  try {
    const isRollNumber = /^\d+$/.test(credentials.username);
    const loginData = isRollNumber 
      ? { rollNumber: credentials.username, password: credentials.password }
      : { email: credentials.username, password: credentials.password };

    const response = await login(loginData);
    
    // Get role from response
    const userRole = response?.user?.role || localStorage.getItem('userRole');
    
    console.log('Login successful, role:', userRole); // Debug
    
    // Navigate based on role
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (userRole === 'teacher') {
      navigate('/teacher/dashboard');
    } else if (userRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/'); // Fallback
    }
  } catch (error) {
    alert('Login failed: ' + (error.response?.data?.message || error.message));
    generateCaptcha();
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoCircle}>🏫</div>
          <div>
            <h1 style={styles.title}>ARS INTER COLLEGE</h1>
            <h2 style={styles.titleHindi}>एआरएस इंटर कॉलेज</h2>
            <p style={styles.subtitle}>(An Institution of Excellence under Bihar Education Board)</p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={styles.container}>
        {/* Left - Latest Update */}
        <div style={styles.column}>
          <div style={styles.boxHeader}>LATEST UPDATE</div>
          <div style={styles.box}>
            <a href="#" style={styles.link}>ID CARD FOR CLASS 10 & 12 2025-26 BATCH STUDENT...</a>
            <a href="#" style={styles.link}>ADMISSION OPEN FOR SESSION 2025-26...</a>
            <a href="#" style={styles.link}>ANNUAL EXAMINATION SCHEDULE 2025...</a>
          </div>
        </div>

        {/* Center - Login */}
        <div style={styles.column}>
          <div style={styles.boxHeader}>LOGIN</div>
          <div style={styles.box}>
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Please enter user name."
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  style={styles.input}
                  required
                />
                <span style={styles.inputIcon}>👤</span>
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Please enter password."
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  style={styles.input}
                  required
                />
                <span style={styles.inputIcon}>🔒</span>
                <span style={styles.keyIcon}>⌨️</span>
              </div>

              {/* Captcha Display and Refresh */}
              <div style={styles.captchaRow}>
                <div style={styles.captchaDisplay}>
                  <span style={styles.captchaText}>{generatedCaptcha}</span>
                </div>
                <button 
                  type="button" 
                  onClick={generateCaptcha} 
                  style={styles.refreshIcon}
                  title="Refresh Captcha"
                >
                  🔄
                </button>
              </div>

              {/* Captcha Input */}
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="ENTER CAPTCHA."
                  value={credentials.captcha}
                  onChange={(e) => setCredentials({ ...credentials, captcha: e.target.value.toUpperCase() })}
                  style={styles.input}
                  required
                  maxLength={6}
                />
              </div>

              {/* Login Button */}
              <button type="submit" disabled={loading} style={styles.loginBtn}>
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>

              {/* Forgot Password */}
              <a href="/forgot-password" style={styles.forgotLink}>Forgot Password?</a>
            </form>
          </div>
        </div>

        {/* Right - News & Events */}
        <div style={styles.column}>
          <div style={styles.boxHeader}>NEWS & EVENTS</div>
          <div style={styles.box}>
            <div style={styles.otherInfoTitle}>OTHER INFORMATION</div>
            <p style={styles.infoText}>
              To register in Training and Placement click on{' '}
              <a href="/tpSignup" style={styles.linkBlue}>T&P Sign Up</a>
            </p>
            <p style={styles.infoText}>
              Company Registration{' '}
              <a href="/companyRegister" style={styles.linkBlue}>Company Register</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>Developed By : Masters Software, Nagpur</p>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#d9d9d9', fontFamily: 'Arial' },
  header: { background: 'linear-gradient(to right, #1565c0, #1e88e5)', padding: 20 },
  headerContent: { maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20 },
  logoCircle: { width: 70, height: 70, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', margin: 0 },
  titleHindi: { fontSize: 20, fontWeight: 'bold', color: '#fff', margin: '4px 0' },
  subtitle: { fontSize: 12, color: '#fff', margin: 0, opacity: 0.95 },
  container: { maxWidth: 1200, margin: '30px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 },
  column: {},
  boxHeader: { background: '#1565c0', color: '#fff', padding: '12px 15px', fontSize: 14, fontWeight: 'bold', textAlign: 'center', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  box: { background: '#fff', padding: 25, minHeight: 300, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  inputGroup: { position: 'relative', marginBottom: 18 },
  input: { width: '100%', padding: '10px 40px 10px 10px', fontSize: 14, border: '1px solid #ccc', borderRadius: 4, outline: 'none', boxSizing: 'border-box' },
  inputIcon: { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 },
  keyIcon: { position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', fontSize: 16 },
  captchaRow: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 },
  captchaDisplay: { flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '12px', borderRadius: 4, textAlign: 'center', border: '2px solid #5a67d8' },
  captchaText: { fontSize: 24, fontWeight: 'bold', color: '#fff', letterSpacing: 8, fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', userSelect: 'none' },
  refreshIcon: { padding: '10px 14px', background: '#1565c0', color: '#fff', border: 'none', borderRadius: 4, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginBtn: { width: '100%', padding: 12, background: '#1565c0', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', marginTop: 10 },
  forgotLink: { display: 'block', textAlign: 'center', color: '#1565c0', fontSize: 14, textDecoration: 'none', marginTop: 15 },
  link: { display: 'block', color: '#333', fontSize: 13, textDecoration: 'none', marginBottom: 12, lineHeight: 1.6 },
  otherInfoTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 15, color: '#333' },
  infoText: { fontSize: 13, color: '#555', marginBottom: 12, lineHeight: 1.6 },
  linkBlue: { color: '#1565c0', textDecoration: 'none' },
  footer: { background: '#1a237e', padding: 15, textAlign: 'center', marginTop: 40 },
  footerText: { color: '#fff', fontSize: 13, margin: 0 },
};

export default Login;
