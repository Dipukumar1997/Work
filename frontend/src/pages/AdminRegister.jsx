import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register-admin', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      alert('✅ Admin registered successfully!');
      
      // Store token and redirect to admin dashboard
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'admin');
      
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>🏫 ARS INTER COLLEGE</h1>
            <h2 style={styles.subtitle}>Admin Registration</h2>
          </div>

          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  style={styles.input}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  style={styles.input}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={styles.input}
                placeholder="admin@arscollege.com"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={styles.input}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password *</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                style={styles.input}
                placeholder="Re-enter password"
                required
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              style={styles.submitBtn}
              disabled={loading}
            >
              {loading ? '⏳ Registering...' : '✅ Register Admin'}
            </button>
          </form>

          <div style={styles.footer}>
            <p style={styles.note}>
              Note: Admin registration is only available when no admins exist in the system.
            </p>
            <a href="/" style={styles.link}>← Back to Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 550,
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: 40,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    margin: 0,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  error: {
    background: '#fee',
    color: '#c33',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 15,
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
    transition: 'border 0.3s',
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
    transition: 'background 0.3s',
  },
  footer: {
    marginTop: 25,
    textAlign: 'center',
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 14,
  },
};

export default AdminRegister;
