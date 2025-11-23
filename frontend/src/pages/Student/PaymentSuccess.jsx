// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [verifying, setVerifying] = useState(true);

//   useEffect(() => {
//     verifyPayment();
//   }, []);

//   const verifyPayment = async () => {
//     const sessionId = searchParams.get('session_id');
//     const month = searchParams.get('month');
//     const amount = searchParams.get('amount');

//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5000/api/payment/verify-stripe',
//         { sessionId, month, amount: parseInt(amount) },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setVerifying(false);
//       setTimeout(() => navigate('/student/payment'), 3000);
//     } catch (error) {
//       alert('Verification failed: ' + error.message);
//       navigate('/student/payment');
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {verifying ? (
//         <div style={styles.box}>
//           <h2>⏳ Verifying Payment...</h2>
//           <p>Please wait while we confirm your payment.</p>
//         </div>
//       ) : (
//         <div style={styles.box}>
//           <h2>✅ Payment Successful!</h2>
//           <p>Your payment has been processed successfully.</p>
//           <p>Redirecting to payment page...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' },
//   box: { background: '#fff', padding: 40, borderRadius: 8, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
// };

// export default PaymentSuccess;



import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const sessionId = searchParams.get('session_id');
    const month = searchParams.get('month');
    const amount = searchParams.get('amount');

    if (!sessionId || !month || !amount) {
      setError('Missing payment information');
      setVerifying(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/api/payment/verify-stripe',
        { sessionId, month, amount: parseInt(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Verification response:', response.data);

      if (response.data.success) {
        setVerifying(false);
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/student/payment');
        }, 2000);
      }

    } catch (error) {
      console.error('Verification error:', error);
      setError(error.response?.data?.message || error.message);
      setVerifying(false);
      
      // Redirect even on error after 3 seconds
      setTimeout(() => {
        navigate('/student/payment');
      }, 3000);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        {verifying ? (
          <>
            <div style={styles.spinner}>⏳</div>
            <h2 style={styles.title}>Verifying Payment...</h2>
            <p style={styles.text}>Please wait while we confirm your payment.</p>
          </>
        ) : error ? (
          <>
            <div style={styles.error}>❌</div>
            <h2 style={styles.title}>Verification Failed</h2>
            <p style={styles.text}>{error}</p>
            <p style={styles.small}>Redirecting back...</p>
          </>
        ) : (
          <>
            <div style={styles.success}>✅</div>
            <h2 style={styles.title}>Payment Successful!</h2>
            <p style={styles.text}>Your payment has been processed successfully.</p>
            <p style={styles.small}>Redirecting to payment page...</p>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' },
  box: { background: '#fff', padding: 50, borderRadius: 12, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', maxWidth: 500 },
  spinner: { fontSize: 60, marginBottom: 20 },
  success: { fontSize: 80, color: '#4caf50', marginBottom: 20 },
  error: { fontSize: 80, color: '#f44336', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  text: { fontSize: 16, color: '#666', marginBottom: 10 },
  small: { fontSize: 13, color: '#999', marginTop: 20 }
};

export default PaymentSuccess;
