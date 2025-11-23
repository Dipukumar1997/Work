// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Sidebar from '../../components/Sidebar';

// const StudentDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar role="student" />
      
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
//         <p className="text-gray-600 mb-8">Welcome back, {user.email}</p>

//         <div className="grid md:grid-cols-3 gap-6">
//           <Link to="/student/profile" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-3">👤</div>
//             <h2 className="text-2xl font-bold text-blue-600 mb-2">My Profile</h2>
//             <p className="text-gray-600">View and update your profile</p>
//           </Link>

//           <Link to="/student/documents" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-3">📄</div>
//             <h2 className="text-2xl font-bold text-blue-600 mb-2">Documents</h2>
//             <p className="text-gray-600">Manage your documents</p>
//           </Link>

//           <Link to="/student/exams" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-3">📋</div>
//             <h2 className="text-2xl font-bold text-blue-600 mb-2">Exams</h2>
//             <p className="text-gray-600">View exams and admit cards</p>
//           </Link>

//           <Link to="/student/payment" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-3">💳</div>
//             <h2 className="text-2xl font-bold text-blue-600 mb-2">Payments</h2>
//             <p className="text-gray-600">Payment history and new payments</p>
//           </Link>

//           <Link to="/student/applications" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-3">✉️</div>
//             <h2 className="text-2xl font-bold text-blue-600 mb-2">Applications</h2>
//             <p className="text-gray-600">Send applications to admin</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const StudentDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <div>
//             <h1 style={styles.collegeName}>🏫 ARS INTER COLLEGE</h1>
//             <p style={styles.tagline}>Excellence in Education</p>
//           </div>
//           <div style={styles.userSection}>
//             <span style={styles.userEmail}>{user?.email}</span>
//             <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <button 
//         style={styles.mobileMenuBtn}
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         ☰ Menu
//       </button>

//       <div style={styles.wrapper}>
//         {/* Sidebar */}
//         <div 
//           style={{
//             ...styles.sidebar,
//             width: sidebarOpen ? '200px' : '60px'
//           }}
//           onMouseEnter={() => setSidebarOpen(true)}
//           onMouseLeave={() => setSidebarOpen(false)}
//         >
//           <Link to="/student/dashboard" style={styles.menuItem}>
//             <span style={styles.menuIcon}>📊</span>
//             {sidebarOpen && <span style={styles.menuText}>Dashboard</span>}
//           </Link>
          
//           <Link to="/student/profile" style={styles.menuItem}>
//             <span style={styles.menuIcon}>👤</span>
//             {sidebarOpen && <span style={styles.menuText}>Profile</span>}
//           </Link>
          
//           <Link to="/student/documents" style={styles.menuItem}>
//             <span style={styles.menuIcon}>📄</span>
//             {sidebarOpen && <span style={styles.menuText}>Documents</span>}
//           </Link>
          
//           <Link to="/student/exams" style={styles.menuItem}>
//             <span style={styles.menuIcon}>📝</span>
//             {sidebarOpen && <span style={styles.menuText}>Exams</span>}
//           </Link>
          
//           <Link to="/student/payment" style={styles.menuItem}>
//             <span style={styles.menuIcon}>💳</span>
//             {sidebarOpen && <span style={styles.menuText}>Payment</span>}
//           </Link>
          
//           <Link to="/student/applications" style={styles.menuItem}>
//             <span style={styles.menuIcon}>✉️</span>
//             {sidebarOpen && <span style={styles.menuText}>Applications</span>}
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div style={styles.mainContent}>
//           <h2 style={styles.pageTitle}>Student Dashboard</h2>
//           <p style={styles.welcomeText}>Welcome back, {user?.email}</p>

//           {/* News & Events Section */}
//           <div style={styles.section}>
//             <h3 style={styles.sectionTitle}>NEWS & EVENTS</h3>
//             <div style={styles.noticeBox}>
//               <div style={styles.noticeItem}>
//                 <p style={styles.noticeTitle}>ID CARD FOR M.TECH ADM. BATCH 2025-2026...</p>
//                 <Link to="#" style={styles.noticeLink}>ID CARD FOR M.TECH ADM. BATCH 2025-2026...</Link>
//               </div>
//               <div style={styles.noticeItem}>
//                 <p style={styles.noticeTitle}>ID CARD FOR B.TECH 2025-26 ADM. BATCH STUDENT...</p>
//                 <Link to="#" style={styles.noticeLink}>ID CARD FOR B.TECH 2025-26 ADM. BATCH STUDENT...</Link>
//               </div>
//               <div style={styles.noticeItem}>
//                 <p style={styles.noticeTitle}>NOTICE FOR EXTENSION OF ODD SEM 2025-26 REG...</p>
//                 <Link to="#" style={styles.noticeLink}>NOTICE FOR EXTENSION OF ODD SEM 2025-26 REG...</Link>
//               </div>
//             </div>
//           </div>

//           {/* Notice Board Section */}
//           <div style={styles.section}>
//             <h3 style={styles.sectionTitle}>NOTICE BOARD</h3>
//             <div style={styles.noticeBox}>
//               <div style={styles.noticeItem}>
//                 <p style={styles.noticeTitle}>ORDER (CHANGE OF BRANCH)...</p>
//                 <Link to="#" style={styles.noticeLink}>ORDER (CHANGE OF BRANCH)...</Link>
//               </div>
//               <div style={styles.noticeItem}>
//                 <p style={styles.noticeTitle}>ORDER FOR Ph.D ACAD. LEAVE RESCINDED...</p>
//                 <Link to="#" style={styles.noticeLink}>ORDER FOR Ph.D ACAD. LEAVE RESCINDED...</Link>
//               </div>
//             </div>
//           </div>

//           {/* Training & Placement Section */}
//           <div style={styles.section}>
//             <h3 style={styles.sectionTitle}>TRAINING & PLACEMENT NOTICE</h3>
//             <div style={styles.noticeBox}>
//               <p style={styles.emptyNotice}>No placement notices at this time</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   page: {
//     minHeight: '100vh',
//     background: '#f0f0f0',
//     fontFamily: 'Arial, sans-serif',
//   },
//   header: {
//     background: '#fff',
//     borderBottom: '2px solid #333',
//     padding: '15px 0',
//   },
//   headerContent: {
//     maxWidth: 1400,
//     margin: '0 auto',
//     padding: '0 20px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   collegeName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     margin: 0,
//   },
//   tagline: {
//     fontSize: 12,
//     color: '#666',
//     margin: '4px 0 0 0',
//   },
//   userSection: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: 12,
//   },
//   userEmail: {
//     fontSize: 13,
//     color: '#333',
//   },
//   logoutBtn: {
//     padding: '6px 14px',
//     background: '#333',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: 13,
//   },
//   mobileMenuBtn: {
//     display: 'none',
//     padding: '10px 15px',
//     background: '#333',
//     color: '#fff',
//     border: 'none',
//     width: '100%',
//     textAlign: 'left',
//     cursor: 'pointer',
//     fontSize: 14,
//   },
//   wrapper: {
//     display: 'flex',
//     minHeight: 'calc(100vh - 100px)',
//   },
//   sidebar: {
//     background: '#2c3e50',
//     transition: 'width 0.3s',
//     overflow: 'hidden',
//     position: 'sticky',
//     top: 0,
//     height: '100vh',
//   },
//   menuItem: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '15px 10px',
//     color: '#fff',
//     textDecoration: 'none',
//     borderBottom: '1px solid #34495e',
//     whiteSpace: 'nowrap',
//   },
//   menuIcon: {
//     fontSize: 20,
//     width: 40,
//     textAlign: 'center',
//   },
//   menuText: {
//     fontSize: 14,
//     marginLeft: 10,
//   },
//   mainContent: {
//     flex: 1,
//     padding: 30,
//     maxWidth: 1200,
//   },
//   pageTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//     borderBottom: '2px solid #333',
//     paddingBottom: 8,
//   },
//   welcomeText: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     background: '#7f8c8d',
//     color: '#fff',
//     padding: '10px 15px',
//     fontSize: 16,
//     fontWeight: 'bold',
//     margin: 0,
//   },
//   noticeBox: {
//     background: '#fff',
//     border: '1px solid #ddd',
//     padding: 20,
//     minHeight: 150,
//   },
//   noticeItem: {
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottom: '1px solid #eee',
//   },
//   noticeTitle: {
//     fontSize: 13,
//     color: '#333',
//     marginBottom: 5,
//   },
//   noticeLink: {
//     fontSize: 13,
//     color: '#0066cc',
//     textDecoration: 'none',
//   },
//   emptyNotice: {
//     fontSize: 13,
//     color: '#999',
//     textAlign: 'center',
//     padding: '30px 0',
//   },
// };

// // Media query for mobile
// if (window.innerWidth <= 768) {
//   styles.mobileMenuBtn.display = 'block';
//   styles.sidebar.position = 'fixed';
//   styles.sidebar.zIndex = 1000;
// }

// export default StudentDashboard;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏫 ARS INTER COLLEGE</h1>
        <div style={styles.headerRight}>
          <span style={styles.email}>{user?.email}</span>
          <button onClick={() => { logout(); navigate('/login'); }} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      {/* Horizontal Dropdown Navigation */}
      <div style={styles.navbar}>
        
        {/* ACADEMIC Menu */}
        <div 
          style={styles.menuItem}
          onMouseEnter={() => setOpenMenu('academic')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span style={styles.menuLabel}>ACADEMIC ▼</span>
          {openMenu === 'academic' && (
            <div style={styles.dropdown}>
              <Link to="/student/profile" style={styles.dropdownItem}>Student Section - Transaction</Link>
              <Link to="/student/admission" style={styles.dropdownItem}>Admission</Link>
              <Link to="/student/utility" style={styles.dropdownItem}>Utility</Link>
            </div>
          )}
        </div>

        {/* EXAMINATION Menu */}
        <div 
          style={styles.menuItem}
          onMouseEnter={() => setOpenMenu('examination')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span style={styles.menuLabel}>EXAMINATION ▼</span>
          {openMenu === 'examination' && (
            <div style={styles.dropdown}>
              <Link to="/student/exams" style={styles.dropdownItem}>Exam Schedule</Link>
              <Link to="/student/results" style={styles.dropdownItem}>Results</Link>
              <Link to="/student/admit-card" style={styles.dropdownItem}>Admit Card</Link>
            </div>
          )}
        </div>

        {/* DOCUMENTS */}
        <Link to="/student/documents" style={{...styles.menuItem, ...styles.singleLink}}>
          DOCUMENTS
        </Link>

        {/* PAYMENT Menu */}
        <div 
          style={styles.menuItem}
          onMouseEnter={() => setOpenMenu('payment')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span style={styles.menuLabel}>PAYMENT ▼</span>
          {openMenu === 'payment' && (
            <div style={styles.dropdown}>
              <Link to="/student/payment" style={styles.dropdownItem}>Online Payment</Link>
              <Link to="/student/payment-history" style={styles.dropdownItem}>Payment History</Link>
            </div>
          )}
        </div>

        {/* APPLICATIONS */}
        <Link to="/student/applications" style={{...styles.menuItem, ...styles.singleLink}}>
          APPLICATIONS
        </Link>

      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Student Dashboard</h2>
        <p style={styles.welcome}>Welcome back, {user?.email}</p>

        {/* 3 Column Grid */}
        <div style={styles.grid}>
          
          {/* News & Events */}
          <div>
            <div style={styles.sectionHeader}>NEWS & EVENTS</div>
            <div style={styles.box}>
              <div style={styles.item}>
                <p style={styles.itemTitle}>ID CARD FOR M.TECH ADM. BATCH 2025-2026...</p>
                <a href="#" style={styles.link}>ID CARD FOR M.TECH ADM. BATCH 2025-2026...</a>
              </div>
              <div style={styles.item}>
                <p style={styles.itemTitle}>ID CARD FOR B.TECH 2025-26 ADM. BATCH STUDENT...</p>
                <a href="#" style={styles.link}>ID CARD FOR B.TECH 2025-26 ADM. BATCH STUDENT...</a>
              </div>
              <div style={styles.item}>
                <p style={styles.itemTitle}>NOTICE FOR EXTENSION OF ODD SEM 2025-26 REG...</p>
                <a href="#" style={styles.link}>NOTICE FOR EXTENSION OF ODD SEM 2025-26 REG...</a>
              </div>
            </div>
          </div>

          {/* Notice Board */}
          <div>
            <div style={styles.sectionHeader}>NOTICE BOARD</div>
            <div style={styles.box}>
              <div style={styles.item}>
                <p style={styles.itemTitle}>ORDER (CHANGE OF BRANCH)...</p>
                <a href="#" style={styles.link}>ORDER (CHANGE OF BRANCH)...</a>
              </div>
              <div style={styles.item}>
                <p style={styles.itemTitle}>ORDER FOR Ph.D ACAD. LEAVE RESCINDED...</p>
                <a href="#" style={styles.link}>ORDER FOR Ph.D ACAD. LEAVE RESCINDED...</a>
              </div>
            </div>
          </div>

          {/* Training & Placement */}
          <div>
            <div style={styles.sectionHeader}>TRAINING & PLACEMENT NOTICE</div>
            <div style={styles.box}>
              <p style={styles.empty}>No placement notices at this time</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#e8e8e8', fontFamily: 'Arial, sans-serif' },
  header: { background: '#fff', padding: '12px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, margin: 0, color: '#333', fontWeight: 'bold' },
  headerRight: { display: 'flex', gap: 12, alignItems: 'center' },
  email: { fontSize: 12, color: '#666' },
  logoutBtn: { padding: '5px 10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11 },
  
  // Navigation with Dropdowns
  navbar: { background: '#5a5a5a', display: 'flex', padding: 0, borderBottom: '2px solid #333', position: 'relative' },
  menuItem: { position: 'relative', padding: '12px 18px', color: '#fff', borderRight: '1px solid #6a6a6a', cursor: 'pointer' },
  menuLabel: { fontSize: 13, fontWeight: 'normal' },
  singleLink: { textDecoration: 'none', display: 'flex', alignItems: 'center' },
  dropdown: { position: 'absolute', top: '100%', left: 0, background: '#f0f0f0', minWidth: 220, boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000, border: '1px solid #ccc' },
  dropdownItem: { display: 'block', padding: '10px 15px', color: '#333', textDecoration: 'none', fontSize: 12, borderBottom: '1px solid #ddd', background: '#fff' },
  
  content: { padding: 20, maxWidth: 1400, margin: '0 auto' },
  pageTitle: { fontSize: 18, fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: 5, marginBottom: 5 },
  welcome: { fontSize: 11, color: '#666', marginBottom: 20 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15 },
  sectionHeader: { background: '#7f8c8d', color: '#fff', padding: '7px 10px', fontSize: 13, fontWeight: 'bold' },
  box: { background: '#fff', border: '1px solid #ddd', padding: 12, minHeight: 180 },
  item: { marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #f0f0f0' },
  itemTitle: { fontSize: 11, color: '#333', margin: '0 0 4px 0' },
  link: { fontSize: 11, color: '#0066cc', textDecoration: 'none' },
  empty: { textAlign: 'center', color: '#999', fontSize: 11, padding: '30px 0', margin: 0 },
};

export default StudentDashboard;
