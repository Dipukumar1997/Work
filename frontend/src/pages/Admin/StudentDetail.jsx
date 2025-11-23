// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const StudentDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);
//   const [permissions, setPermissions] = useState({
//     generalInfo: false,
//     addressDetails: false,
//     personalInfo: false,
//     examScores: false,
//     scholarshipDetails: false,
//     onlinePayment: false
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentDetails();
//   }, [id]);

//   const fetchStudentDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         `http://localhost:5000/api/admin/students/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setStudent(response.data.student);
//       setPermissions(response.data.student.editPermissions || permissions);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to load student details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePermissionChange = (section) => {
//     setPermissions({
//       ...permissions,
//       [section]: !permissions[section]
//     });
//   };

//   const savePermissions = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:5000/api/admin/students/${id}/permissions`,
//         { editPermissions: permissions },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert('✅ Permissions updated successfully!');
//     } catch (error) {
//       alert('❌ Failed to update permissions: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading...</div>;
//   if (!student) return <div style={styles.loading}>Student not found</div>;

//   return (
//     <div style={styles.page}>
//       <div style={styles.header}>
//         <button onClick={() => navigate('/admin/students')} style={styles.backBtn}>
//           ← Back to Students
//         </button>
//         <h1 style={styles.title}>Student Details - {student.rollNumber}</h1>
//       </div>

//       {/* Student Info */}
//       <div style={styles.infoCard}>
//         <h2 style={styles.sectionTitle}>Basic Information</h2>
//         <div style={styles.grid}>
//           <div style={styles.field}>
//             <strong>Name:</strong> {student.firstName} {student.lastName}
//           </div>
//           <div style={styles.field}>
//             <strong>Roll Number:</strong> {student.rollNumber}
//           </div>
//           <div style={styles.field}>
//             <strong>Email:</strong> {student.userId?.email}
//           </div>
//           <div style={styles.field}>
//             <strong>Class:</strong> {student.class}
//           </div>
//           <div style={styles.field}>
//             <strong>Phone:</strong> {student.phone || 'N/A'}
//           </div>
//           <div style={styles.field}>
//             <strong>DOB:</strong> {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}
//           </div>
//         </div>
//       </div>

//       {/* Edit Permissions */}
//       <div style={styles.permissionsCard}>
//         <h2 style={styles.sectionTitle}>Allow Student to Edit Sections</h2>
//         <p style={styles.subtitle}>Toggle sections that the student can update</p>

//         <div style={styles.permissionsGrid}>
//           <div style={styles.permissionItem}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={permissions.generalInfo}
//                 onChange={() => handlePermissionChange('generalInfo')}
//                 style={styles.checkbox}
//               />
//               <span style={styles.permissionText}>General Information</span>
//             </label>
//           </div>

//           <div style={styles.permissionItem}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={permissions.addressDetails}
//                 onChange={() => handlePermissionChange('addressDetails')}
//                 style={styles.checkbox}
//               />
//               <span style={styles.permissionText}>Address Details</span>
//             </label>
//           </div>

//           <div style={styles.permissionItem}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={permissions.personalInfo}
//                 onChange={() => handlePermissionChange('personalInfo')}
//                 style={styles.checkbox}
//               />
//               <span style={styles.permissionText}>Personal Information</span>
//             </label>
//           </div>

//           <div style={styles.permissionItem}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={permissions.examScores}
//                 onChange={() => handlePermissionChange('examScores')}
//                 style={styles.checkbox}
//               />
//               <span style={styles.permissionText}>Exam Scores</span>
//             </label>
//           </div>

//           <div style={styles.permissionItem}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={permissions.scholarshipDetails}
//                 onChange={() => handlePermissionChange('scholarshipDetails')}
//                 style={styles.checkbox}
//               />
//               <span style={styles.permissionText}>Scholarship Details</span>
//             </label>
//           </div>

//           <div style={styles.permissionItem}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={permissions.onlinePayment}
//                 onChange={() => handlePermissionChange('onlinePayment')}
//                 style={styles.checkbox}
//               />
//               <span style={styles.permissionText}>Online Payment</span>
//             </label>
//           </div>
//         </div>

//         <button onClick={savePermissions} style={styles.saveBtn}>
//           💾 Save Permissions
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: { padding: 40, background: '#f5f5f5', minHeight: '100vh' },
//   loading: { textAlign: 'center', padding: 60, fontSize: 18 },
//   header: { marginBottom: 30 },
//   backBtn: { padding: '10px 20px', background: '#666', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, marginBottom: 15 },
//   title: { fontSize: 28, fontWeight: 'bold', color: '#333', margin: 0 },
//   infoCard: { background: '#fff', padding: 30, borderRadius: 8, marginBottom: 30, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
//   sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333', borderBottom: '2px solid #667eea', paddingBottom: 10 },
//   subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 },
//   field: { fontSize: 14, color: '#555' },
//   permissionsCard: { background: '#fff', padding: 30, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
//   permissionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15, marginBottom: 30 },
//   permissionItem: { padding: 15, background: '#f9f9f9', borderRadius: 8, border: '1px solid #e0e0e0' },
//   checkboxLabel: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
//   checkbox: { width: 20, height: 20, marginRight: 12, cursor: 'pointer' },
//   permissionText: { fontSize: 15, color: '#333' },
//   saveBtn: { padding: '14px 40px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
// };

// export default StudentDetail;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [permissions, setPermissions] = useState({
    generalInfo: true,
    addressDetails: true,
    personalInfo: true,
    examScores: true,
    scholarshipDetails: true,
    onlinePayment: false  // Disabled by default
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/admin/students/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudent(response.data.student);
      
      // Use existing permissions or defaults
      if (response.data.student.editPermissions) {
        setPermissions(response.data.student.editPermissions);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load student details');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (section) => {
    setPermissions({
      ...permissions,
      [section]: !permissions[section]
    });
  };

  const savePermissions = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/students/${id}/permissions`,
        { editPermissions: permissions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Permissions updated successfully!');
      fetchStudentDetails();
    } catch (error) {
      console.error('Permission update error:', error);
      alert('❌ Failed to update permissions');
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!student) return <div style={styles.loading}>Student not found</div>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => navigate('/admin/students')} style={styles.backBtn}>
          ← Back to Students
        </button>
        <h1 style={styles.title}>Student Management - {student.rollNumber}</h1>
      </div>

      {/* Student Basic Info */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Student Information</h2>
        <div style={styles.grid}>
          <div><strong>Name:</strong> {student.firstName} {student.lastName}</div>
          <div><strong>Roll Number:</strong> {student.rollNumber}</div>
          <div><strong>Email:</strong> {student.userId?.email}</div>
          <div><strong>Class:</strong> {student.class}</div>
          <div><strong>Phone:</strong> {student.phone || 'N/A'}</div>
          <div><strong>DOB:</strong> {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</div>
        </div>
      </div>

      {/* Edit Permissions - All Visible by Default, Admin Can Toggle */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Section Edit Permissions</h2>
        <p style={styles.note}>All sections are visible. Toggle to enable/disable student editing.</p>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Section Name</th>
              <th style={styles.th}>Visibility</th>
              <th style={styles.th}>Student Can Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tableRow}>
              <td style={styles.td}>General Information</td>
              <td style={styles.td}>✅ Visible</td>
              <td style={styles.td}>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={permissions.generalInfo}
                    onChange={() => handlePermissionChange('generalInfo')}
                  />
                  <span>{permissions.generalInfo ? 'Enabled' : 'Disabled'}</span>
                </label>
              </td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.td}>Address Details</td>
              <td style={styles.td}>✅ Visible</td>
              <td style={styles.td}>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={permissions.addressDetails}
                    onChange={() => handlePermissionChange('addressDetails')}
                  />
                  <span>{permissions.addressDetails ? 'Enabled' : 'Disabled'}</span>
                </label>
              </td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.td}>Personal Information</td>
              <td style={styles.td}>✅ Visible</td>
              <td style={styles.td}>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={permissions.personalInfo}
                    onChange={() => handlePermissionChange('personalInfo')}
                  />
                  <span>{permissions.personalInfo ? 'Enabled' : 'Disabled'}</span>
                </label>
              </td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.td}>Exam Scores</td>
              <td style={styles.td}>✅ Visible</td>
              <td style={styles.td}>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={permissions.examScores}
                    onChange={() => handlePermissionChange('examScores')}
                  />
                  <span>{permissions.examScores ? 'Enabled' : 'Disabled'}</span>
                </label>
              </td>
            </tr>
            <tr style={styles.tableRow}>
              <td style={styles.td}>Online Payment</td>
              <td style={styles.td}>✅ Visible</td>
              <td style={styles.td}>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={permissions.onlinePayment}
                    onChange={() => handlePermissionChange('onlinePayment')}
                  />
                  <span>{permissions.onlinePayment ? 'Enabled' : 'Disabled'}</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={savePermissions} style={styles.saveBtn}>
          💾 Save Permissions
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: 40, background: '#f5f5f5', minHeight: '100vh' },
  loading: { textAlign: 'center', padding: 60, fontSize: 18 },
  header: { marginBottom: 30 },
  backBtn: { padding: '10px 20px', background: '#666', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', margin: 0 },
  card: { background: '#fff', padding: 30, borderRadius: 8, marginBottom: 30, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333', borderBottom: '2px solid #1e5a8e', paddingBottom: 10 },
  note: { fontSize: 13, color: '#666', marginBottom: 20, fontStyle: 'italic' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15, fontSize: 14 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 20 },
  tableHeader: { background: '#f0f0f0' },
  th: { padding: 12, textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: 14, fontWeight: 'bold' },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: 12, fontSize: 14 },
  toggle: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  saveBtn: { padding: '12px 30px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 'bold', cursor: 'pointer' },
};

export default StudentDetail;
