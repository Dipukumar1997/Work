import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    classes: [],
    profile: {
      bio: '',
      qualifications: [],
      degrees: [],
      experience: 0
    }
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await adminAPI.getAllTeachers();
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addTeacher(formData);
      alert('Teacher added successfully!');
      setShowForm(false);
      fetchTeachers();
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        classes: [],
        profile: { bio: '', qualifications: [], degrees: [], experience: 0 }
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding teacher');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Teachers</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : '+ Add Teacher'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
            <h3 className="text-xl font-bold mb-4">Add Teacher</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Years of Experience"
                value={formData.profile.experience}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  profile: { ...formData.profile, experience: parseInt(e.target.value) }
                })}
                className="px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <textarea
              placeholder="Bio"
              value={formData.profile.bio}
              onChange={(e) => setFormData({ 
                ...formData, 
                profile: { ...formData.profile, bio: e.target.value }
              })}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            />

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Add Teacher
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Teacher ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Experience</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{teacher.teacherId}</td>
                    <td className="px-6 py-4">{teacher.firstName} {teacher.lastName}</td>
                    <td className="px-6 py-4">{teacher.userId?.email}</td>
                    <td className="px-6 py-4">{teacher.profile?.experience || 0} years</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline mr-4">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
