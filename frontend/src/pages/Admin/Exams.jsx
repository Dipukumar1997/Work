import { useState } from 'react';
import { adminAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Exams = () => {
  const [formData, setFormData] = useState({
    examName: '',
    examType: 'mid-term',
    examDate: '',
    class: '',
    admitCardAvailable: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createExam(formData);
      alert('Exam created successfully!');
      setFormData({
        examName: '',
        examType: 'mid-term',
        examDate: '',
        class: '',
        admitCardAvailable: false
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating exam');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Create Exam</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exam Name</label>
            <input
              type="text"
              value={formData.examName}
              onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Mid-Term Examination"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exam Type</label>
            <select
              value={formData.examType}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="mid-term">Mid-Term</option>
              <option value="final">Final</option>
              <option value="unit-test">Unit Test</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Exam Date</label>
            <input
              type="date"
              value={formData.examDate}
              onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
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
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="admitCard"
              checked={formData.admitCardAvailable}
              onChange={(e) => setFormData({ ...formData, admitCardAvailable: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="admitCard" className="text-gray-700">Admit Card Available</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Exam
          </button>
        </form>
      </div>
    </div>
  );
};

export default Exams;
