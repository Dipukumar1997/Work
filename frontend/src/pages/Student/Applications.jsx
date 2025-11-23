import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await studentAPI.getApplications();
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.sendApplication(formData);
      alert('Application sent successfully!');
      setShowForm(false);
      fetchApplications();
      setFormData({ subject: '', message: '' });
    } catch (error) {
      alert('Error sending application');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Applications to Admin</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'New Application'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-2xl space-y-4">
            <h3 className="text-xl font-bold mb-4">Send Application</h3>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g., Leave Application"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows="5"
                placeholder="Enter your message here..."
                required
              />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Send Application
            </button>
          </form>
        )}

        <div className="grid gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-600">No applications sent yet</p>
          ) : (
            applications.map((app) => (
              <div key={app._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{app.subject}</h3>
                  <span className={`px-3 py-1 rounded text-white ${
                    app.status === 'pending' ? 'bg-yellow-500' :
                    app.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{app.message}</p>
                <p className="text-sm text-gray-500">
                  Submitted: {new Date(app.submittedDate).toLocaleDateString()}
                </p>
                {app.adminResponse && (
                  <div className="mt-4 p-4 bg-blue-50 rounded">
                    <p className="font-semibold text-blue-900">Admin Response:</p>
                    <p className="text-blue-800">{app.adminResponse}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
