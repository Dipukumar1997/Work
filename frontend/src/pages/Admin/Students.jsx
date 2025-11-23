import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [searchRollNo, setSearchRollNo] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/admin/students?limit=10',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchRollNo) {
      alert('Please enter roll number');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/admin/students/search?rollNumber=${searchRollNo}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.student) {
        navigate(`/admin/student/${response.data.student._id}`);
      }
    } catch (error) {
      alert('Student not found: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Student Management</h1>
      
      {/* Search Box */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by Roll Number (e.g., 20250200001)"
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>
          🔍 Search Student
        </button>
      </div>

      {/* Recent Students List */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Students (First 10)</h2>
        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : students.length === 0 ? (
          <p style={styles.empty}>No students found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Roll Number</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Class</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} style={styles.tableRow}>
                  <td style={styles.td}>{student.rollNumber}</td>
                  <td style={styles.td}>{student.firstName} {student.lastName}</td>
                  <td style={styles.td}>{student.userId?.email}</td>
                  <td style={styles.td}>{student.class}</td>
                  <td style={styles.td}>{student.phone || 'N/A'}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => navigate(`/admin/student/${student._id}`)}
                      style={styles.viewBtn}
                    >
                      View/Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: 40, background: '#f5f5f5', minHeight: '100vh' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  searchBox: { background: '#fff', padding: 30, borderRadius: 8, display: 'flex', gap: 15, marginBottom: 40, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  searchInput: { flex: 1, padding: 12, fontSize: 16, border: '2px solid #ddd', borderRadius: 4 },
  searchBtn: { padding: '12px 30px', background: '#667eea', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  section: { background: '#fff', padding: 30, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  loading: { textAlign: 'center', padding: 40, color: '#666' },
  empty: { textAlign: 'center', padding: 40, color: '#999' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#f0f0f0' },
  th: { padding: 12, textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: 14, fontWeight: 'bold', color: '#333' },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: 12, fontSize: 14, color: '#555' },
  viewBtn: { padding: '6px 16px', background: '#667eea', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontWeight: 'bold' },
};

export default Students;
