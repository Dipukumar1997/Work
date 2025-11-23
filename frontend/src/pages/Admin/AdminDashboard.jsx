import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: 'Students',
      icon: '👨‍🎓',
      description: 'Manage all students',
      link: '/admin/students',
      color: '#3b82f6'
    },
    {
      title: 'Teachers',
      icon: '👨‍🏫',
      description: 'Manage all teachers',
      link: '/admin/teachers',
      color: '#8b5cf6'
    },
    {
      title: 'Admissions',
      icon: '📝',
      description: 'Process admission requests',
      link: '/admin/admissions',
      color: '#ec4899'
    },
    {
      title: 'Subjects',
      icon: '📚',
      description: 'Add and manage subjects',
      link: '/admin/subjects',
      color: '#10b981'
    },
    {
      title: 'Exams',
      icon: '📋',
      description: 'Create and manage exams',
      link: '/admin/exams',
      color: '#f59e0b'
    },
    {
      title: 'Applications',
      icon: '✉️',
      description: 'View student applications',
      link: '/admin/applications',
      color: '#06b6d4'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.headerTitle}>Admin Dashboard</h1>
            <p style={styles.headerSubtitle}>Manage your school system</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user?.email}</span>
              <span style={styles.userRole}>Administrator</span>
            </div>
            <button onClick={logout} style={styles.logoutBtn}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.grid}>
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.link} 
              style={{...styles.card, borderTop: `4px solid ${item.color}`}}
            >
              <div style={styles.cardIcon}>{item.icon}</div>
              <h2 style={{...styles.cardTitle, color: item.color}}>{item.title}</h2>
              <p style={styles.cardDesc}>{item.description}</p>
              <div style={{...styles.cardArrow, color: item.color}}>→</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  header: {
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    padding: '24px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '4px 0 0 0',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  logoutBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24,
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: 32,
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    margin: 0,
  },
  cardArrow: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    fontSize: 32,
    fontWeight: 'bold',
    transition: 'transform 0.3s',
  },
};

export default AdminDashboard;
