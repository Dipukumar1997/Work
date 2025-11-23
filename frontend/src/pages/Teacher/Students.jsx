import { useState, useEffect } from 'react';
import { teacherAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Students = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await teacherAPI.getClasses();
      setClasses(response.data.classes);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchStudents = async (classId) => {
    setLoading(true);
    try {
      const response = await teacherAPI.getStudentsByClass(classId);
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    if (classId) {
      fetchStudents(classId);
    } else {
      setStudents([]);
    }
  };

  const markCriteria = async (studentId, met) => {
    try {
      await teacherAPI.markAttendanceCriteria({
        studentId,
        subjectId: null, // You'll need to handle subject selection
        criteriaMet: met
      });
      alert('Criteria marked successfully!');
      fetchStudents(selectedClass);
    } catch (error) {
      alert('Error marking criteria');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="teacher" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Students</h1>

        <div className="mb-6 max-w-md">
          <label className="block text-gray-700 font-semibold mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : students.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Roll Number</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="px-6 py-4">{student.rollNumber}</td>
                    <td className="px-6 py-4">{student.firstName} {student.lastName}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => markCriteria(student._id, true)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                      >
                        Mark Fulfilled
                      </button>
                      <button
                        onClick={() => markCriteria(student._id, false)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Mark Not Fulfilled
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">Select a class to view students</p>
        )}
      </div>
    </div>
  );
};

export default Students;
