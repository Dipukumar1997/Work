import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Payment = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: ''
  });

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const response = await studentAPI.getPaymentHistory();
      setPaymentHistory(response.data.paymentHistory);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.makePayment({
        ...formData,
        transactionId: 'TXN' + Date.now()
      });
      alert('Payment successful!');
      setShowForm(false);
      fetchPaymentHistory();
      setFormData({ amount: '', purpose: '' });
    } catch (error) {
      alert('Payment failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Payments</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Make Payment'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md space-y-4">
            <h3 className="text-xl font-bold mb-4">Make Payment</h3>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Amount (₹)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Select Purpose</option>
                <option value="Tuition Fee">Tuition Fee</option>
                <option value="Exam Fee">Exam Fee</option>
                <option value="Library Fee">Library Fee</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Pay Now
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Payment History</h2>
          
          {loading ? (
            <p>Loading...</p>
          ) : paymentHistory.length === 0 ? (
            <p className="text-gray-600">No payment history</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Transaction ID</th>
                    <th className="px-4 py-2 text-left">Purpose</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{payment.transactionId}</td>
                      <td className="px-4 py-2">{payment.purpose}</td>
                      <td className="px-4 py-2">₹{payment.amount}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
