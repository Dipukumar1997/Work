import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch students on mount
    const fetchStudents = async () => {
      try {
        const res = await adminAPI.getAllStudents();
        setStudents(res.data.students || []);
      } catch (err) {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Student Management</h2>

        {loading ? (
          <div className="text-gray-500">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="text-gray-500">No students found.</div>
        ) : (
          <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-2 text-left">Roll Number</th>
                <th className="px-6 py-2 text-left">Name</th>
                <th className="px-6 py-2 text-left">Email</th>
                <th className="px-6 py-2 text-left">Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="px-6 py-2">{student.rollNumber}</td>
                  <td className="px-6 py-2">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-2">
                    {student.userId?.email}
                  </td>
                  <td className="px-6 py-2">{student.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* You can add Edit, Delete, and Add actions here later */}
      </div>
    </div>
  );
};

export default Students;
