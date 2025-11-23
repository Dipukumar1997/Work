import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [marksheets, setMarksheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [examsRes, marksheetsRes] = await Promise.all([
        studentAPI.getExams(),
        studentAPI.getMarksheets()
      ]);
      setExams(examsRes.data.exams);
      setMarksheets(marksheetsRes.data.examResults);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadAdmitCard = async (examId) => {
    try {
      const response = await studentAPI.downloadAdmitCard(examId);
      alert('Admit card downloaded!');
    } catch (error) {
      alert(error.response?.data?.message || 'Cannot download admit card');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Exams & Results</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
          <div className="grid gap-4">
            {exams.length === 0 ? (
              <p className="text-gray-600">No upcoming exams</p>
            ) : (
              exams.map((exam) => (
                <div key={exam._id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">{exam.examName}</h3>
                  <p className="text-gray-600 mb-2">
                    Date: {new Date(exam.examDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-4">Type: {exam.examType}</p>
                  {exam.admitCardAvailable && (
                    <button
                      onClick={() => downloadAdmitCard(exam._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Download Admit Card
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Previous Results</h2>
          <div className="grid gap-4">
            {marksheets.length === 0 ? (
              <p className="text-gray-600">No results available</p>
            ) : (
              marksheets.map((result, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Exam Result</h3>
                  <p className="text-gray-600 mb-2">Percentage: {result.percentage}%</p>
                  {result.marksheetUrl && (
                    <a
                      href={result.marksheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded inline-block hover:bg-green-700"
                    >
                      Download Marksheet
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
