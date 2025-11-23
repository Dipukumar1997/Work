import { useState } from 'react';
import { adminAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Subjects = () => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    class: '',
    attendanceCriteria: 75
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addSubject(formData);
      alert('Subject added successfully!');
      setFormData({
        subjectName: '',
        subjectCode: '',
        class: '',
        attendanceCriteria: 75
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding subject');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Add Subject/Course</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Subject Name</label>
            <input
              type="text"
              value={formData.subjectName}
              onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Mathematics"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Subject Code</label>
            <input
              type="text"
              value={formData.subjectCode}
              onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., MATH101"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Class</label>
            <select
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Class</option>
              {['playgroup', 'lkg', 'ukg', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(c => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Attendance Criteria (%)</label>
            <input
              type="number"
              value={formData.attendanceCriteria}
              onChange={(e) => setFormData({ ...formData, attendanceCriteria: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              min="0"
              max="100"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subjects;
