// import { useState, useEffect } from 'react';
// import { adminAPI } from '../../services/api';
// import Sidebar from '../../components/Sidebar';

// const Admissions = () => {
//   const [admissions, setAdmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedAdmission, setSelectedAdmission] = useState(null);

//   useEffect(() => {
//     fetchAdmissions();
//   }, []);

//   const fetchAdmissions = async () => {
//     try {
//       const response = await adminAPI.getAllAdmissions();
//       setAdmissions(response.data.admissions);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     const classAssigned = prompt('Enter class to assign:');
//     if (!classAssigned) return;

//     try {
//       await adminAPI.approveAdmission(id, { classAssigned, courseId: null });
//       alert('Admission approved successfully!');
//       fetchAdmissions();
//     } catch (error) {
//       alert(error.response?.data?.message || 'Error approving admission');
//     }
//   };

//   const handleReject = async (id) => {
//     if (!confirm('Are you sure you want to reject this admission?')) return;

//     try {
//       await adminAPI.rejectAdmission(id);
//       alert('Admission rejected');
//       fetchAdmissions();
//     } catch (error) {
//       alert(error.response?.data?.message || 'Error rejecting admission');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar role="admin" />
      
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">Admission Requests</h1>

//         {loading ? (
//           <div className="text-center py-8">Loading...</div>
//         ) : (
//           <div className="grid gap-6">
//             {admissions.map((admission) => (
//               <div key={admission._id} className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold">
//                       {admission.basicDetails.firstName} {admission.basicDetails.lastName}
//                     </h3>
//                     <p className="text-gray-600">Application ID: {admission.applicationId}</p>
//                     <p className="text-gray-600">Email: {admission.basicDetails.email}</p>
//                     <p className="text-gray-600">Class Applied: {admission.basicDetails.class}</p>
//                   </div>
//                   <span className={`px-4 py-2 rounded-full text-white ${
//                     admission.status === 'submitted' ? 'bg-yellow-500' :
//                     admission.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
//                   }`}>
//                     {admission.status.toUpperCase()}
//                   </span>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-sm text-gray-600">Parent Name</p>
//                     <p className="font-semibold">{admission.basicDetails.parentName}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Parent Contact</p>
//                     <p className="font-semibold">{admission.basicDetails.parentContact}</p>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <p className="text-sm text-gray-600 mb-2">Payment Status</p>
//                   <span className={`px-3 py-1 rounded ${
//                     admission.payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {admission.payment.status}
//                   </span>
//                   {admission.payment.status === 'completed' && (
//                     <span className="ml-4 text-sm">₹{admission.payment.amount}</span>
//                   )}
//                 </div>

//                 {admission.status === 'submitted' && (
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => handleApprove(admission._id)}
//                       className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(admission._id)}
//                       className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admissions;




import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await adminAPI.getAllAdmissions();
      setAdmissions(response.data.admissions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, admission) => {
    // Prompt for class assignment
    const classAssigned = prompt('Enter class to assign:', admission.basicDetails.classApplied);
    if (!classAssigned) return;

    // Confirm approval
    if (!confirm(`Approve admission for ${admission.basicDetails.firstName} ${admission.basicDetails.lastName}?`)) {
      return;
    }

    try {
      const response = await adminAPI.approveAdmission(id, { 
        classAssigned,
        courseId: null 
      });
      
      alert(`✅ Admission approved!\n\nRoll Number: ${response.data.rollNumber}\nDefault Password: ${response.data.defaultPassword}\n\nStudent can now login with this roll number.`);
      fetchAdmissions();
    } catch (error) {
      alert(error.response?.data?.message || 'Error approving admission');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this admission?')) return;

    try {
      await adminAPI.rejectAdmission(id);
      alert('Admission rejected');
      fetchAdmissions();
    } catch (error) {
      alert(error.response?.data?.message || 'Error rejecting admission');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admission Requests</h1>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : admissions.length === 0 ? (
        <div style={styles.empty}>No admission requests found</div>
      ) : (
        <div style={styles.grid}>
          {admissions.map((admission) => (
            <div key={admission._id} style={styles.card}>
              <div style={styles.header}>
                <div>
                  <h3 style={styles.name}>
                    {admission.basicDetails.firstName} {admission.basicDetails.lastName}
                  </h3>
                  <p style={styles.appId}>ID: {admission.applicationId}</p>
                </div>
                <span style={{
                  ...styles.badge,
                  background: 
                    admission.status === 'submitted' ? '#fbbf24' :
                    admission.status === 'approved' ? '#22c55e' : '#ef4444'
                }}>
                  {admission.status.toUpperCase()}
                </span>
              </div>

              <div style={styles.details}>
                <div style={styles.row}>
                  <span style={styles.label}>Email:</span>
                  <span>{admission.basicDetails.email}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Phone:</span>
                  <span>{admission.basicDetails.phone}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Class Applied:</span>
                  <span>{admission.basicDetails.classApplied?.toUpperCase()}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Parent:</span>
                  <span>{admission.basicDetails.parentName}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Parent Contact:</span>
                  <span>{admission.basicDetails.parentContact}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Payment:</span>
                  <span style={{
                    color: admission.payment.status === 'completed' ? '#22c55e' : '#fbbf24',
                    fontWeight: 'bold'
                  }}>
                    {admission.payment.status.toUpperCase()} 
                    {admission.payment.status === 'completed' && ` (₹${admission.payment.amount})`}
                  </span>
                </div>
              </div>

              {admission.status === 'submitted' && (
                <div style={styles.actions}>
                  <button
                    onClick={() => handleApprove(admission._id, admission)}
                    style={{...styles.btn, ...styles.approveBtn}}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(admission._id)}
                    style={{...styles.btn, ...styles.rejectBtn}}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}

              {admission.status === 'approved' && admission.rollNumber && (
                <div style={styles.approvedInfo}>
                  <p style={styles.rollNumber}>Roll Number: <strong>{admission.rollNumber}</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: 40,
    background: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: 18,
    padding: 40,
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
    padding: 40,
    color: '#999',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: 20,
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  appId: {
    fontSize: 12,
    color: '#666',
    margin: '4px 0 0 0',
  },
  badge: {
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  actions: {
    display: 'flex',
    gap: 10,
    marginTop: 20,
  },
  btn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  approveBtn: {
    background: '#22c55e',
    color: '#fff',
  },
  rejectBtn: {
    background: '#ef4444',
    color: '#fff',
  },
  approvedInfo: {
    marginTop: 20,
    padding: 12,
    background: '#dcfce7',
    borderRadius: 8,
  },
  rollNumber: {
    margin: 0,
    fontSize: 14,
    color: '#166534',
  },
};

export default Admissions;
