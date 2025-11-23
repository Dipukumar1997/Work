import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AdmissionSuccess = () => {
  const location = useLocation();
  const applicationId = location.state?.applicationId || 'N/A';
  const [downloading, setDownloading] = useState(false);

//   const downloadPDF = async () => {
//     setDownloading(true);
//     try {
//       // Request PDF from backend
//        const response = await axios({
//       url: `http://localhost:5000/api/admission/download-pdf/${applicationId}`,
//       method: 'GET',
//       responseType: 'blob',
//       timeout: 30000, // 30 second timeout
//     });
      
//       // Create blob URL and trigger download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `admission-${applicationId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       alert('Error downloading PDF');
//     } finally {
//       setDownloading(false);
//     }
//   };



const downloadPDF = async () => {
  setDownloading(true);
  try {
    // Direct link approach - no CORS issues
    const link = document.createElement('a');
    link.href = `http://localhost:5000/api/admission/download-pdf/${applicationId}`;
    link.setAttribute('download', `admission-${applicationId}.pdf`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Small delay then show success
    setTimeout(() => {
      setDownloading(false);
    }, 1000);
    
  } catch (error) {
    console.error('Download error:', error);
    setDownloading(false);
  }
};

return (
    <div style={{
      minHeight: '80vh',
      maxWidth: 600,
      margin: 'auto',
      padding: 48,
      background: '#1a1a1a',
      color: '#fff',
      borderRadius: 16,
      marginTop: 64,
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 16, color: '#22c55e' }}>
        Admission Successful!
      </h2>
      <p style={{ fontSize: 18, marginBottom: 32, color: '#aaa' }}>
        Thank you for applying to ARS Inter College. Your application has been submitted successfully.
      </p>
      
      <div style={{ background: '#2a2a2a', padding: 24, borderRadius: 8, marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>Application ID</p>
        <p style={{ fontSize: 24, fontWeight: 'bold', color: '#3182ce' }}>{applicationId}</p>
      </div>

      <button
        onClick={downloadPDF}
        disabled={downloading}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: 18,
          borderRadius: 8,
          border: 'none',
          background: '#22c55e',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: 16
        }}
      >
        {downloading ? 'Downloading...' : '📄 Download Admission PDF'}
      </button>

      <Link to="/" style={{
        display: 'block',
        padding: '16px',
        fontSize: 18,
        borderRadius: 8,
        background: '#555',
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none'
      }}>
        Back to Home
      </Link>
    </div>
  );
};

export default AdmissionSuccess;
