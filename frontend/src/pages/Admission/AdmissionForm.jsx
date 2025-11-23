import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { admissionAPI } from '../../services/api';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [applicationId, setApplicationId] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [basic, setBasic] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    parentName: '',
    parentContact: '',
    classApplied: '',
  });
  
  const [documents, setDocuments] = useState({
    birthCertificate: null,
    photo: null,
  });
  
  const [payment, setPayment] = useState({
    amount: '5000',
    transactionId: '',
  });

  // Step 1: Submit Basic Details to Backend
  const submitBasic = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await admissionAPI.submitBasicDetails(basic);
      setApplicationId(response.data.applicationId);
      alert('Basic details submitted successfully!');
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting basic details');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Upload Documents to Backend
  const submitDocuments = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In real app, upload files to cloud storage and get URLs
      const docData = {
        applicationId,
        documents: [
          {
            docType: 'birth_certificate',
            docUrl: 'https://example.com/birth-cert.pdf' // Replace with actual upload
          },
          {
            docType: 'photo',
            docUrl: 'https://example.com/photo.jpg' // Replace with actual upload
          }
        ]
      };
      await admissionAPI.uploadDocuments(docData);
      alert('Documents uploaded successfully!');
      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || 'Error uploading documents');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Process Payment and Complete Admission
  const submitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await admissionAPI.processPayment({
        applicationId,
        transactionId: payment.transactionId,
        amount: parseInt(payment.amount)
      });
      alert('Payment successful! Admission complete.');
      // Redirect to success page
      navigate('/admission/success', { 
        state: { applicationId } 
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBasic = (e) => {
    setBasic({ ...basic, [e.target.name]: e.target.value });
  };

  const handleDocument = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  const handlePayment = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Admission Form</h2>
      
      {/* Progress Indicator */}
      <div style={progressContainer}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            ...stepCircle,
            background: step >= s ? '#3182ce' : '#434343',
            border: step === s ? '2px solid #fff' : 'none'
          }}>
            {s}
          </div>
        ))}
      </div>

      {applicationId && (
        <div style={{ marginBottom: 16, color: '#22c55e', fontSize: 14 }}>
          Application ID: <strong>{applicationId}</strong>
        </div>
      )}

      {/* Step 1: Basic Details */}
      {step === 1 && (
        <form onSubmit={submitBasic}>
          <h3 style={stepTitle}>Step 1: Basic Details</h3>
          <input name="firstName" value={basic.firstName} onChange={handleBasic} placeholder="First Name" required style={inputStyle} />
          <input name="lastName" value={basic.lastName} onChange={handleBasic} placeholder="Last Name" required style={inputStyle} />
          <input name="dob" type="date" value={basic.dob} onChange={handleBasic} required style={inputStyle} />
          <input name="email" value={basic.email} onChange={handleBasic} placeholder="Email" type="email" required style={inputStyle} />
          <input name="phone" value={basic.phone} onChange={handleBasic} placeholder="Phone Number" required style={inputStyle} />
          <input name="parentName" value={basic.parentName} onChange={handleBasic} placeholder="Parent Name" required style={inputStyle} />
          <input name="parentContact" value={basic.parentContact} onChange={handleBasic} placeholder="Parent Contact" required style={inputStyle} />
          <select name="classApplied" value={basic.classApplied} onChange={handleBasic} required style={inputStyle}>
            <option value="">Select Class</option>
            {['playgroup', 'lkg', 'ukg', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(c =>
              <option key={c} value={c}>{c.toUpperCase()}</option>
            )}
          </select>
          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Submitting...' : 'Next: Upload Documents'}
          </button>
        </form>
      )}

      {/* Step 2: Upload Documents */}
      {step === 2 && (
        <form onSubmit={submitDocuments}>
          <h3 style={stepTitle}>Step 2: Upload Documents</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Birth Certificate</label>
            <input name="birthCertificate" type="file" onChange={handleDocument} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Photo</label>
            <input name="photo" type="file" onChange={handleDocument} required style={inputStyle} />
          </div>
          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Uploading...' : 'Next: Payment'}
          </button>
          <button type="button" onClick={() => setStep(1)} style={{ ...btnStyle, background: '#555', marginTop: 8 }}>
            Back
          </button>
        </form>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <form onSubmit={submitPayment}>
          <h3 style={stepTitle}>Step 3: Payment</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Amount (₹)</label>
            <input
              name="amount"
              value={payment.amount}
              onChange={handlePayment}
              required
              style={inputStyle}
              type="number"
              readOnly
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Transaction ID</label>
            <input
              name="transactionId"
              value={payment.transactionId}
              onChange={handlePayment}
              required
              placeholder="Enter UPI/Payment Transaction ID"
              style={inputStyle}
            />
          </div>
          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Processing...' : 'Submit & Complete Admission'}
          </button>
          <button type="button" onClick={() => setStep(2)} style={{ ...btnStyle, background: '#555', marginTop: 8 }}>
            Back
          </button>
        </form>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '80vh',
  maxWidth: 520,
  margin: 'auto',
  padding: 32,
  background: '#1a1a1a',
  color: '#fff',
  borderRadius: 16,
  marginTop: 32,
  marginBottom: 32,
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 24,
  textAlign: 'center',
};

const stepTitle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#3182ce',
};

const progressContainer = {
  display: 'flex',
  marginBottom: 32,
  gap: 16,
  justifyContent: 'center',
};

const stepCircle = {
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: 20,
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  margin: '8px 0',
  fontSize: 16,
  borderRadius: 8,
  border: 'none',
  background: '#2a2a2a',
  color: '#fff',
};

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  fontSize: 14,
  color: '#aaa',
};

const btnStyle = {
  marginTop: 16,
  width: '100%',
  padding: '14px',
  fontSize: 18,
  borderRadius: 8,
  border: 'none',
  background: '#3182ce',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default AdmissionForm;
