import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>ARS Inter College</h1>
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.title}>Welcome to ARS Inter College</h2>
          <p style={styles.subtitle}>
            Your dream school management system in React and Node.js
          </p>
          <p style={styles.tagline}>Excellence in Education Since 1990</p>
          
          <Link to="/admission" style={styles.admissionBtn}>
            🎓 Get Your Admission Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.icon}>🏫</div>
          <h3 style={styles.featureTitle}>Modern Campus</h3>
          <p style={styles.featureDesc}>
            State-of-the-art facilities for holistic development
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.icon}>👨‍🏫</div>
          <h3 style={styles.featureTitle}>Expert Faculty</h3>
          <p style={styles.featureDesc}>
            Experienced teachers committed to student success
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.icon}>🎯</div>
          <h3 style={styles.featureTitle}>100% Results</h3>
          <p style={styles.featureDesc}>
            Proven track record of academic excellence
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 ARS Inter College. All Rights Reserved.</p>
        <p>Contact: admin@arsintercollege.edu | Phone: +91-XXXXX-XXXXX</p>
      </footer>
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
  },
  navbar: {
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '20px 0',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  },
  navContent: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 0,
  },
  loginBtn: {
    background: '#fff',
    color: '#667eea',
    padding: '12px 30px',
    borderRadius: 25,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 16,
    transition: 'transform 0.2s',
  },
  hero: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '80px 20px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: 800,
    margin: '0 auto',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 10,
    opacity: 0.9,
  },
  tagline: {
    fontSize: 18,
    marginBottom: 50,
    opacity: 0.8,
  },
  admissionBtn: {
    display: 'inline-block',
    background: '#fff',
    color: '#667eea',
    padding: '18px 40px',
    borderRadius: 30,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 20,
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s',
  },
  features: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '60px 20px',
    display: 'flex',
    gap: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: 40,
    borderRadius: 20,
    flex: '1 1 300px',
    maxWidth: 350,
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featureDesc: {
    fontSize: 16,
    opacity: 0.9,
    lineHeight: 1.6,
  },
  footer: {
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '30px 20px',
    textAlign: 'center',
    marginTop: 60,
    borderTop: '2px solid rgba(255, 255, 255, 0.1)',
  },
};

export default Home;
