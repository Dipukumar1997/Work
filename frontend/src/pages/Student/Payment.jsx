// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';

// const Payment = () => {
//   const { user } = useAuth();
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [unpaidFees, setUnpaidFees] = useState([]);
//   const [totalFees, setTotalFees] = useState(0);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch student info on load
//   useEffect(() => {
//     fetchStudentInfo();
//     fetchUnpaidFees();
//     fetchPaymentHistory();
//   }, []);

//   // Calculate total when month is selected
//   useEffect(() => {
//     if (selectedMonth) {
//       const selected = unpaidFees.find(f => f.month === selectedMonth);
//       setTotalFees(selected ? selected.amount : 0);
//     }
//   }, [selectedMonth]);

//   const fetchStudentInfo = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/student/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStudentInfo(response.data.student);
//     } catch (error) {
//       console.error('Error fetching student info:', error);
//     }
//   };

//   const fetchUnpaidFees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         'http://localhost:5000/api/student/unpaid-fees',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUnpaidFees(response.data.unpaidFees || []);
//     } catch (error) {
//       console.error('Error fetching fees:', error);
//       setUnpaidFees([]);
//     }
//   };

//   const fetchPaymentHistory = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         'http://localhost:5000/api/student/payment-history',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPaymentHistory(response.data.payments || []);
//     } catch (error) {
//       console.error('Error fetching payment history:', error);
//     }
//   };

//   // const handlePayment = async () => {
//   //   if (!selectedMonth) {
//   //     alert('Please select a month to pay');
//   //     return;
//   //   }

//   //   const selectedFee = unpaidFees.find(f => f.month === selectedMonth);
//   //   if (!selectedFee) {
//   //     alert('Invalid fee selection');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await axios.post(
//   //       'http://localhost:5000/api/student/payment',
//   //       {
//   //         month: selectedMonth,
//   //         amount: selectedFee.amount
//   //       },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     alert(`✅ Payment successful for ${selectedMonth}!\n\nTransaction ID: ${response.data.payment.transactionId}\nAmount: ₹${response.data.payment.amount}`);
      
//   //     // Refresh data
//   //     fetchUnpaidFees();
//   //     fetchPaymentHistory();
//   //     setSelectedMonth('');
//   //     setTotalFees(0);
//   //   } catch (error) {
//   //     alert('❌ Payment failed: ' + (error.response?.data?.message || error.message));
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const handlePayment = async () => {
//   if (!selectedMonth) {
//     alert('Please select a month');
//     return;
//   }

//   const selectedFee = unpaidFees.find(f => f.month === selectedMonth);
//   setLoading(true);

//   try {
//     const token = localStorage.getItem('token');

//     // Step 1: Create order
//     const orderResponse = await axios.post(
//       'http://localhost:5000/api/payment/create-order',
//       { month: selectedMonth, amount: selectedFee.amount },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const { order, keyId } = orderResponse.data;

//     // Step 2: Open Razorpay checkout
//     const options = {
//       key: keyId,
//       amount: order.amount,
//       currency: order.currency,
//       name: 'ARS INTER COLLEGE',
//       description: `Fee Payment - ${selectedMonth}`,
//       order_id: order.id,
//       handler: async function (response) {
//         // Step 3: Verify payment
//         try {
//           const verifyResponse = await axios.post(
//             'http://localhost:5000/api/payment/verify',
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               month: selectedMonth,
//               amount: selectedFee.amount
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           alert(`✅ Payment Successful!\n\nTransaction ID: ${verifyResponse.data.payment.transactionId}`);
          
//           // Download receipt
//           window.open(`http://localhost:5000/api/payment/receipt/${verifyResponse.data.payment.transactionId}`, '_blank');

//           // Refresh data
//           fetchUnpaidFees();
//           fetchPaymentHistory();
//           setSelectedMonth('');
//           setTotalFees(0);
//         } catch (error) {
//           alert('Payment verification failed: ' + error.message);
//         }
//       },
//       prefill: {
//         name: studentInfo.firstName + ' ' + studentInfo.lastName,
//         email: studentInfo.userId?.email || user?.email,
//         contact: studentInfo.phone
//       },
//       theme: {
//         color: '#1565c0'
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (error) {
//     alert('Failed to initiate payment: ' + error.message);
//   } finally {
//     setLoading(false);
//   }
//   };


//   if (!studentInfo) {
//     return <div style={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.pageTitle}>Application Fees Payment</h1>

//       {/* General Information Box */}
//       <div style={styles.infoBox}>
//         <div style={styles.sectionHeader}>General Information</div>
        
//         <div style={styles.grid}>
//           {/* Left Column */}
//           <div>
//             <div style={styles.row}>
//               <span style={styles.label}>Name :</span>
//               <span style={styles.value}>{studentInfo.firstName} {studentInfo.lastName}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Enrollment No :</span>
//               <span style={styles.value}>{studentInfo.rollNumber}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Class :</span>
//               <span style={styles.value}>{studentInfo.class}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Date of Birth :</span>
//               <span style={styles.value}>
//                 {studentInfo.dob ? new Date(studentInfo.dob).toLocaleDateString() : 'N/A'}
//               </span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Payment Type :</span>
//               <span style={styles.value}>Online Payment</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Session :</span>
//               <span style={styles.value}>2024-2025</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Admission Batch :</span>
//               <span style={styles.value}>2024-2025</span>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div>
//             <div style={styles.row}>
//               <span style={styles.label}>Email Id :</span>
//               <span style={styles.value}>{studentInfo.userId?.email || user?.email}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Mobile Number :</span>
//               <span style={styles.value}>{studentInfo.phone || 'N/A'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Category :</span>
//               <span style={styles.value}>{studentInfo.category || 'GEN-EWS'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Hosteller :</span>
//               <span style={styles.value}>{studentInfo.hosteller ? 'YES' : 'NO'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Gender :</span>
//               <span style={styles.value}>{studentInfo.gender || 'Male'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Fee Month :</span>
//               <select 
//                 value={selectedMonth} 
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 style={styles.select}
//                 disabled={unpaidFees.length === 0}
//               >
//                 <option value="">Please Select Month</option>
//                 {unpaidFees.map((fee, index) => (
//                   <option key={index} value={fee.month}>
//                     {fee.month} - ₹{fee.amount}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Total Fees :</span>
//               <span style={styles.value}>₹{totalFees}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Unpaid Months :</span>
//               <span style={styles.value}>{unpaidFees.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* Pay Now Button */}
//         <div style={styles.buttonContainer}>
//           <button 
//             onClick={handlePayment} 
//             style={{
//               ...styles.payButton,
//               opacity: (loading || !selectedMonth) ? 0.5 : 1,
//               cursor: (loading || !selectedMonth) ? 'not-allowed' : 'pointer'
//             }}
//             disabled={loading || !selectedMonth}
//           >
//             {loading ? 'Processing...' : 'Pay Now'}
//           </button>
//         </div>
//       </div>

//       {/* Payment History Section */}
//       <h2 style={styles.sectionTitle}>Payment History</h2>
//       <div style={styles.historyBox}>
//         {paymentHistory.length === 0 ? (
//           <p style={styles.emptyText}>No payment history</p>
//         ) : (
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeader}>
//                 <th style={styles.th}>Month</th>
//                 <th style={styles.th}>Amount</th>
//                 <th style={styles.th}>Transaction ID</th>
//                 <th style={styles.th}>Payment Date</th>
//                 <th style={styles.th}>Class</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentHistory.map((payment, index) => (
//                 <tr key={index} style={styles.tableRow}>
//                   <td style={styles.td}>{payment.month}</td>
//                   <td style={styles.td}>₹{payment.amount}</td>
//                   <td style={styles.td}>{payment.transactionId}</td>
//                   <td style={styles.td}>{new Date(payment.paymentDate).toLocaleDateString()}</td>
//                   <td style={styles.td}>{payment.class}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: { padding: 20, background: '#f5f5f5', minHeight: '100vh' },
//   pageTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
//   loading: { textAlign: 'center', padding: 40, fontSize: 16 },
//   infoBox: { background: '#fff', border: '2px solid #ff9800', borderRadius: 4, padding: 20, marginBottom: 30 },
//   sectionHeader: { background: '#ff9800', color: '#fff', padding: '8px 12px', fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
//   grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 },
//   row: { display: 'flex', marginBottom: 12, fontSize: 13 },
//   label: { fontWeight: 'bold', minWidth: 150, color: '#333' },
//   value: { color: '#555' },
//   select: { padding: '4px 8px', fontSize: 13, border: '1px solid #ddd', borderRadius: 3, background: '#fff', width: 200 },
//   buttonContainer: { textAlign: 'center', marginTop: 30 },
//   payButton: { padding: '10px 30px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 'bold', cursor: 'pointer' },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
//   historyBox: { background: '#fff', border: '1px solid #ddd', padding: 20 },
//   emptyText: { color: '#999', fontSize: 13, textAlign: 'center', padding: 20 },
//   table: { width: '100%', borderCollapse: 'collapse' },
//   tableHeader: { background: '#f0f0f0' },
//   th: { padding: 10, textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: 13, fontWeight: 'bold' },
//   tableRow: { borderBottom: '1px solid #eee' },
//   td: { padding: 10, fontSize: 13 },
// };

// export default Payment;

























// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';

// const Payment = () => {
//   const { user } = useAuth();
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [unpaidFees, setUnpaidFees] = useState([]);
//   const [totalFees, setTotalFees] = useState(0);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch student info on load
//   useEffect(() => {
//     fetchStudentInfo();
//     fetchUnpaidFees();
//     fetchPaymentHistory();
//   }, []);

//   // Calculate total when month is selected
//   useEffect(() => {
//     if (selectedMonth) {
//       const selected = unpaidFees.find(f => f.month === selectedMonth);
//       setTotalFees(selected ? selected.amount : 0);
//     }
//   }, [selectedMonth]);

//   const fetchStudentInfo = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/student/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStudentInfo(response.data.student);
//     } catch (error) {
//       console.error('Error fetching student info:', error);
//     }
//   };

//   const fetchUnpaidFees = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         'http://localhost:5000/api/student/unpaid-fees',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUnpaidFees(response.data.unpaidFees || []);
//     } catch (error) {
//       console.error('Error fetching fees:', error);
//       setUnpaidFees([]);
//     }
//   };

//   const fetchPaymentHistory = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         'http://localhost:5000/api/student/payment-history',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPaymentHistory(response.data.payments || []);
//     } catch (error) {
//       console.error('Error fetching payment history:', error);
//     }
//   };

//   // MOCK PAYMENT - Works without any external service!

//   // const handlePayment = async () => {
//   //   if (!selectedMonth) {
//   //     alert('Please select a month to pay');
//   //     return;
//   //   }

//   //   const selectedFee = unpaidFees.find(f => f.month === selectedMonth);
//   //   if (!selectedFee) {
//   //     alert('Invalid fee selection');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const token = localStorage.getItem('token');
      
//   //     // Call mock payment endpoint
//   //     const response = await axios.post(
//   //       'http://localhost:5000/api/payment/mock-payment',
//   //       {
//   //         month: selectedMonth,
//   //         amount: selectedFee.amount
//   //       },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     alert(`✅ Payment Successful!\n\nTransaction ID: ${response.data.payment.transactionId}\nMonth: ${response.data.payment.month}\nAmount: ₹${response.data.payment.amount}\n\nPayment has been recorded in your account.`);
      
//   //     // Refresh data
//   //     fetchUnpaidFees();
//   //     fetchPaymentHistory();
//   //     setSelectedMonth('');
//   //     setTotalFees(0);
//   //   } catch (error) {
//   //     alert('❌ Payment failed: ' + (error.response?.data?.message || error.message));
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handlePayment = async () => {
//   if (!selectedMonth) {
//     alert('Please select a month');
//     return;
//   }

//   const selectedFee = unpaidFees.find(f => f.month === selectedMonth);
//   setLoading(true);

//   try {
//     const token = localStorage.getItem('token');

//     // Create Stripe checkout session
//     const response = await axios.post(
//       'http://localhost:5000/api/payment/create-checkout',
//       {
//         month: selectedMonth,
//         amount: selectedFee.amount
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Redirect to Stripe checkout
//     window.location.href = response.data.url;

//   } catch (error) {
//     alert('Failed to initiate payment: ' + (error.response?.data?.message || error.message));
//     setLoading(false);
//   }
//   };


//   if (!studentInfo) {
//     return <div style={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.pageTitle}>Application Fees Payment</h1>

//       {/* General Information Box */}
//       <div style={styles.infoBox}>
//         <div style={styles.sectionHeader}>General Information</div>
        
//         <div style={styles.grid}>
//           {/* Left Column */}
//           <div>
//             <div style={styles.row}>
//               <span style={styles.label}>Name :</span>
//               <span style={styles.value}>{studentInfo.firstName} {studentInfo.lastName}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Enrollment No :</span>
//               <span style={styles.value}>{studentInfo.rollNumber}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Class :</span>
//               <span style={styles.value}>{studentInfo.class}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Date of Birth :</span>
//               <span style={styles.value}>
//                 {studentInfo.dob ? new Date(studentInfo.dob).toLocaleDateString() : 'N/A'}
//               </span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Payment Type :</span>
//               <span style={styles.value}>Online Payment</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Session :</span>
//               <span style={styles.value}>2024-2025</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Admission Batch :</span>
//               <span style={styles.value}>2024-2025</span>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div>
//             <div style={styles.row}>
//               <span style={styles.label}>Email Id :</span>
//               <span style={styles.value}>{studentInfo.userId?.email || user?.email}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Mobile Number :</span>
//               <span style={styles.value}>{studentInfo.phone || 'N/A'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Category :</span>
//               <span style={styles.value}>{studentInfo.category || 'GEN-EWS'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Hosteller :</span>
//               <span style={styles.value}>{studentInfo.hosteller ? 'YES' : 'NO'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Gender :</span>
//               <span style={styles.value}>{studentInfo.gender || 'Male'}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Fee Month :</span>
//               <select 
//                 value={selectedMonth} 
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 style={styles.select}
//                 disabled={unpaidFees.length === 0}
//               >
//                 <option value="">Please Select Month</option>
//                 {unpaidFees.map((fee, index) => (
//                   <option key={index} value={fee.month}>
//                     {fee.month} - ₹{fee.amount}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Total Fees :</span>
//               <span style={styles.value}>₹{totalFees}</span>
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>Unpaid Months :</span>
//               <span style={styles.value}>{unpaidFees.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* Pay Now Button */}
//         <div style={styles.buttonContainer}>
//           <button 
//             onClick={handlePayment} 
//             style={{
//               ...styles.payButton,
//               opacity: (loading || !selectedMonth) ? 0.5 : 1,
//               cursor: (loading || !selectedMonth) ? 'not-allowed' : 'pointer'
//             }}
//             disabled={loading || !selectedMonth}
//           >
//             {loading ? 'Processing...' : 'Pay Now'}
//           </button>
//         </div>
//       </div>

//       {/* Payment History Section */}
//       <h2 style={styles.sectionTitle}>Payment History</h2>
//       <div style={styles.historyBox}>
//         {paymentHistory.length === 0 ? (
//           <p style={styles.emptyText}>No payment history</p>
//         ) : (
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeader}>
//                 <th style={styles.th}>Month</th>
//                 <th style={styles.th}>Amount</th>
//                 <th style={styles.th}>Transaction ID</th>
//                 <th style={styles.th}>Payment Date</th>
//                 <th style={styles.th}>Class</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentHistory.map((payment, index) => (
//                 <tr key={index} style={styles.tableRow}>
//                   <td style={styles.td}>{payment.month}</td>
//                   <td style={styles.td}>₹{payment.amount}</td>
//                   <td style={styles.td}>{payment.transactionId}</td>
//                   <td style={styles.td}>{new Date(payment.paymentDate).toLocaleDateString()}</td>
//                   <td style={styles.td}>{payment.class}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: { padding: 20, background: '#f5f5f5', minHeight: '100vh' },
//   pageTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
//   loading: { textAlign: 'center', padding: 40, fontSize: 16 },
//   infoBox: { background: '#fff', border: '2px solid #ff9800', borderRadius: 4, padding: 20, marginBottom: 30 },
//   sectionHeader: { background: '#ff9800', color: '#fff', padding: '8px 12px', fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
//   grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 },
//   row: { display: 'flex', marginBottom: 12, fontSize: 13 },
//   label: { fontWeight: 'bold', minWidth: 150, color: '#333' },
//   value: { color: '#555' },
//   select: { padding: '4px 8px', fontSize: 13, border: '1px solid #ddd', borderRadius: 3, background: '#fff', width: 200 },
//   buttonContainer: { textAlign: 'center', marginTop: 30 },
//   payButton: { padding: '10px 30px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 'bold', cursor: 'pointer' },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
//   historyBox: { background: '#fff', border: '1px solid #ddd', padding: 20 },
//   emptyText: { color: '#999', fontSize: 13, textAlign: 'center', padding: 20 },
//   table: { width: '100%', borderCollapse: 'collapse' },
//   tableHeader: { background: '#f0f0f0' },
//   th: { padding: 10, textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: 13, fontWeight: 'bold' },
//   tableRow: { borderBottom: '1px solid #eee' },
//   td: { padding: 10, fontSize: 13 },
// };

// export default Payment;




import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Payment = () => {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [unpaidFees, setUnpaidFees] = useState([]);
  const [totalFees, setTotalFees] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch student info on load
  useEffect(() => {
    fetchStudentInfo();
    fetchUnpaidFees();
    fetchPaymentHistory();
  }, []);

  // Calculate total when month is selected
  useEffect(() => {
    if (selectedMonth) {
      const selected = unpaidFees.find(f => f.month === selectedMonth);
      setTotalFees(selected ? selected.amount : 0);
    }
  }, [selectedMonth]);

  const fetchStudentInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/student/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudentInfo(response.data.student);
    } catch (error) {
      console.error('Error fetching student info:', error);
    }
  };

  const fetchUnpaidFees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/student/unpaid-fees',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUnpaidFees(response.data.unpaidFees || []);
    } catch (error) {
      console.error('Error fetching fees:', error);
      setUnpaidFees([]);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/student/payment-history',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaymentHistory(response.data.payments || []);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handlePayment = async () => {
    if (!selectedMonth) {
      alert('Please select a month');
      return;
    }

    const selectedFee = unpaidFees.find(f => f.month === selectedMonth);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Create Stripe checkout session
      const response = await axios.post(
        'http://localhost:5000/api/payment/create-checkout',
        {
          month: selectedMonth,
          amount: selectedFee.amount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe checkout
      window.location.href = response.data.url;

    } catch (error) {
      alert('Failed to initiate payment: ' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  const handleDownloadReceipt = (transactionId) => {
    window.open(`http://localhost:5000/api/payment/receipt/${transactionId}`, '_blank');
  };

  if (!studentInfo) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Application Fees Payment</h1>

      {/* General Information Box */}
      <div style={styles.infoBox}>
        <div style={styles.sectionHeader}>General Information</div>
        
        <div style={styles.grid}>
          {/* Left Column */}
          <div>
            <div style={styles.row}>
              <span style={styles.label}>Name :</span>
              <span style={styles.value}>{studentInfo.firstName} {studentInfo.lastName}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Enrollment No :</span>
              <span style={styles.value}>{studentInfo.rollNumber}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Class :</span>
              <span style={styles.value}>{studentInfo.class}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Date of Birth :</span>
              <span style={styles.value}>
                {studentInfo.dob ? new Date(studentInfo.dob).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Payment Type :</span>
              <span style={styles.value}>Online Payment</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Session :</span>
              <span style={styles.value}>2024-2025</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Admission Batch :</span>
              <span style={styles.value}>2024-2025</span>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={styles.row}>
              <span style={styles.label}>Email Id :</span>
              <span style={styles.value}>{studentInfo.userId?.email || user?.email}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Mobile Number :</span>
              <span style={styles.value}>{studentInfo.phone || 'N/A'}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Category :</span>
              <span style={styles.value}>{studentInfo.category || 'GEN-EWS'}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Hosteller :</span>
              <span style={styles.value}>{studentInfo.hosteller ? 'YES' : 'NO'}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Gender :</span>
              <span style={styles.value}>{studentInfo.gender || 'Male'}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Fee Month :</span>
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={styles.select}
                disabled={unpaidFees.length === 0}
              >
                <option value="">Please Select Month</option>
                {unpaidFees.map((fee, index) => (
                  <option key={index} value={fee.month}>
                    {fee.month} - ₹{fee.amount}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Total Fees :</span>
              <span style={styles.value}>₹{totalFees}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Unpaid Months :</span>
              <span style={styles.value}>{unpaidFees.length}</span>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <div style={styles.buttonContainer}>
          <button 
            onClick={handlePayment} 
            style={{
              ...styles.payButton,
              opacity: (loading || !selectedMonth) ? 0.5 : 1,
              cursor: (loading || !selectedMonth) ? 'not-allowed' : 'pointer'
            }}
            disabled={loading || !selectedMonth}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>

      {/* Payment History Section */}
      <h2 style={styles.sectionTitle}>Payment History</h2>
      <div style={styles.historyBox}>
        {paymentHistory.length === 0 ? (
          <p style={styles.emptyText}>No payment history</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Month</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Payment Date</th>
                <th style={styles.th}>Class</th>
                <th style={styles.th}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.td}>{payment.month}</td>
                  <td style={styles.td}>₹{payment.amount}</td>
                  <td style={styles.td}>{payment.transactionId}</td>
                  <td style={styles.td}>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td style={styles.td}>{payment.class}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDownloadReceipt(payment.transactionId)}
                      style={styles.downloadBtn}
                      title="Download Receipt PDF"
                    >
                      📥 Download
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
  page: { padding: 20, background: '#f5f5f5', minHeight: '100vh' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  loading: { textAlign: 'center', padding: 40, fontSize: 16 },
  infoBox: { background: '#fff', border: '2px solid #ff9800', borderRadius: 4, padding: 20, marginBottom: 30 },
  sectionHeader: { background: '#ff9800', color: '#fff', padding: '8px 12px', fontSize: 14, fontWeight: 'bold', marginBottom: 20 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 },
  row: { display: 'flex', marginBottom: 12, fontSize: 13 },
  label: { fontWeight: 'bold', minWidth: 150, color: '#333' },
  value: { color: '#555' },
  select: { padding: '4px 8px', fontSize: 13, border: '1px solid #ddd', borderRadius: 3, background: '#fff', width: 200 },
  buttonContainer: { textAlign: 'center', marginTop: 30 },
  payButton: { padding: '10px 30px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 'bold', cursor: 'pointer' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  historyBox: { background: '#fff', border: '1px solid #ddd', padding: 20 },
  emptyText: { color: '#999', fontSize: 13, textAlign: 'center', padding: 20 },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#f0f0f0' },
  th: { padding: 10, textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: 13, fontWeight: 'bold' },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: 10, fontSize: 13 },
  downloadBtn: {
    padding: '6px 14px',
    background: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s'
  }
};

export default Payment;
