// import { useState, useEffect } from 'react';
// import { studentAPI } from '../../services/api';
// import Sidebar from '../../components/Sidebar';

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await studentAPI.getProfile();
//       setProfile(response.data.student);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <Sidebar role="student" />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-xl">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar role="student" />
      
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">My Profile</h1>

//         {profile && (
//           <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-gray-600">Roll Number</p>
//                 <p className="text-lg font-semibold">{profile.rollNumber}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-600">Name</p>
//                 <p className="text-lg font-semibold">{profile.firstName} {profile.lastName}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-600">Class</p>
//                 <p className="text-lg font-semibold">{profile.class}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-600">Admission Date</p>
//                 <p className="text-lg font-semibold">
//                   {new Date(profile.admissionDate).toLocaleDateString()}
//                 </p>
//               </div>

//               {profile.address && (
//                 <>
//                   <div>
//                     <p className="text-sm text-gray-600">City</p>
//                     <p className="text-lg font-semibold">{profile.address.city || 'N/A'}</p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-600">Country</p>
//                     <p className="text-lg font-semibold">{profile.address.country || 'N/A'}</p>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;



import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const [studentInfo, setStudentInfo] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/student/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudentInfo(response.data.student);
      setFormData(response.data.student);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
  };

  const handleCancel = (section) => {
    setEditMode({ ...editMode, [section]: false });
    setFormData(studentInfo);
  };

  const handleSave = async (section) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/student/update-profile',
        { section, data: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully!');
      setEditMode({ ...editMode, [section]: false });
      fetchStudentProfile();
    } catch (error) {
      alert('Update failed: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!studentInfo) return <div style={styles.loading}>No student info found</div>;

  const permissions = studentInfo.editPermissions || {};

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🏫 ARS INTER COLLEGE</h1>
        <div style={styles.headerRight}>
          <span style={styles.userEmail}>{user?.email}</span>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {/* Navbar with Dropdowns */}
      <div style={styles.navbar}>
        <div 
          style={styles.menuItem}
          onMouseEnter={() => setOpenMenu('academic')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span style={styles.menuLabel}>ACADEMIC ▼</span>
          {openMenu === 'academic' && (
            <div style={styles.dropdown}>
              <a href="/student/profile" style={styles.dropdownItem}>Student Profile</a>
              <a href="/student/documents" style={styles.dropdownItem}>Documents</a>
            </div>
          )}
        </div>

        <div 
          style={styles.menuItem}
          onMouseEnter={() => setOpenMenu('examination')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span style={styles.menuLabel}>EXAMINATION ▼</span>
          {openMenu === 'examination' && (
            <div style={styles.dropdown}>
              <a href="/student/exams" style={styles.dropdownItem}>Exam Schedule</a>
              <a href="/student/results" style={styles.dropdownItem}>Results</a>
            </div>
          )}
        </div>

        <a href="/student/documents" style={{...styles.menuItem, ...styles.singleLink}}>DOCUMENTS</a>
        <a href="/student/payment" style={{...styles.menuItem, ...styles.singleLink}}>PAYMENT</a>
        <a href="/student/applications" style={{...styles.menuItem, ...styles.singleLink}}>APPLICATIONS</a>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.pageTitle}>STUDENT INFORMATION</h1>
        <p style={styles.note}>Note : * marked fields are Mandatory</p>

        {/* General Info Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span>General Info</span>
            {permissions.generalInfo && !editMode.generalInfo && (
              <button onClick={() => handleEdit('generalInfo')} style={styles.editBtn}>✏️</button>
            )}
          </div>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>ID No.:</label>
              <input value={studentInfo._id} disabled style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Enrollment No.:</label>
              <input value={formData.rollNumber || ''} disabled={!editMode.generalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Student Name:</label>
              <input value={`${formData.firstName} ${formData.lastName}` || ''} disabled={!editMode.generalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Date of Birth:</label>
              <input type="date" value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''} disabled={!editMode.generalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Gender:</label>
              <select disabled={!editMode.generalInfo} style={styles.input}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Blood Group:</label>
              <input value={formData.bloodGroup || 'A+'} disabled={!editMode.generalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Student Email Id:</label>
              <input value={formData.userId?.email || user?.email} disabled={!editMode.generalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Student Mobile No.:</label>
              <input value={formData.phone || ''} disabled={!editMode.generalInfo} style={styles.input} />
            </div>
          </div>
          {editMode.generalInfo && (
            <div style={styles.btnGroup}>
              <button onClick={() => handleSave('generalInfo')} style={styles.saveBtn}>Save</button>
              <button onClick={() => handleCancel('generalInfo')} style={styles.cancelBtn}>Cancel</button>
            </div>
          )}
        </div>

        {/* Address Details */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span>Address and Contact Details</span>
            {permissions.addressDetails && !editMode.addressDetails && (
              <button onClick={() => handleEdit('addressDetails')} style={styles.editBtn}>✏️</button>
            )}
          </div>
          <div style={styles.subsection}>
            <div style={styles.subsectionTitle}>Local Address</div>
            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>*Local Address:</label>
                <textarea value={formData.address?.local || ''} disabled={!editMode.addressDetails} style={{...styles.input, height: 60}} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>*City:</label>
                <input value={formData.address?.city || ''} disabled={!editMode.addressDetails} style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>*State:</label>
                <input value={formData.address?.state || ''} disabled={!editMode.addressDetails} style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>*Pin Code:</label>
                <input value={formData.address?.pincode || ''} disabled={!editMode.addressDetails} style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>*Mobile No.:</label>
                <input value={formData.phone || ''} disabled={!editMode.addressDetails} style={styles.input} />
              </div>
            </div>
          </div>
          {editMode.addressDetails && (
            <div style={styles.btnGroup}>
              <button onClick={() => handleSave('addressDetails')} style={styles.saveBtn}>Save</button>
              <button onClick={() => handleCancel('addressDetails')} style={styles.cancelBtn}>Cancel</button>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span>Personal Information</span>
            {permissions.personalInfo && !editMode.personalInfo && (
              <button onClick={() => handleEdit('personalInfo')} style={styles.editBtn}>✏️</button>
            )}
          </div>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>*Birth Place:</label>
              <input value={formData.birthPlace || ''} disabled={!editMode.personalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Mother Tongue:</label>
              <input value={formData.motherTongue || ''} disabled={!editMode.personalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Religion:</label>
              <input value={formData.religion || ''} disabled={!editMode.personalInfo} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>*Aadhar Card No.:</label>
              <input value={formData.aadharNumber || ''} disabled={!editMode.personalInfo} style={styles.input} />
            </div>
          </div>
          {editMode.personalInfo && (
            <div style={styles.btnGroup}>
              <button onClick={() => handleSave('personalInfo')} style={styles.saveBtn}>Save</button>
              <button onClick={() => handleCancel('personalInfo')} style={styles.cancelBtn}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#e8e8e8', fontFamily: 'Arial' },
  header: { background: '#fff', padding: '12px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, margin: 0, color: '#333', fontWeight: 'bold' },
  headerRight: { display: 'flex', gap: 12, alignItems: 'center' },
  userEmail: { fontSize: 12, color: '#666' },
  logoutBtn: { padding: '5px 10px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11 },
  navbar: { background: '#5a5a5a', display: 'flex', padding: 0, borderBottom: '2px solid #333', position: 'relative' },
  menuItem: { position: 'relative', padding: '12px 18px', color: '#fff', borderRight: '1px solid #6a6a6a', cursor: 'pointer' },
  menuLabel: { fontSize: 13 },
  singleLink: { textDecoration: 'none', display: 'flex', alignItems: 'center' },
  dropdown: { position: 'absolute', top: '100%', left: 0, background: '#f0f0f0', minWidth: 220, boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000, border: '1px solid #ccc' },
  dropdownItem: { display: 'block', padding: '10px 15px', color: '#333', textDecoration: 'none', fontSize: 12, borderBottom: '1px solid #ddd', background: '#fff' },
  content: { padding: 20 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  note: { fontSize: 12, color: 'red', marginBottom: 20 },
  loading: { textAlign: 'center', padding: 40 },
  section: { background: '#fff', marginBottom: 20, border: '1px solid #ddd' },
  sectionHeader: { background: '#ff6600', color: '#fff', padding: '10px 15px', fontSize: 14, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' },
  editBtn: { background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '4px 8px', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 15, padding: 20 },
  field: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 5 },
  input: { padding: 8, fontSize: 13, border: '1px solid #ddd', borderRadius: 4 },
  subsection: { padding: 20, borderTop: '1px solid #eee' },
  subsectionTitle: { background: '#ffaa00', padding: '8px 12px', fontSize: 13, fontWeight: 'bold', marginBottom: 15 },
  btnGroup: { padding: 20, display: 'flex', gap: 10, justifyContent: 'center' },
  saveBtn: { padding: '10px 30px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { padding: '10px 30px', background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' },
};

export default Profile;
