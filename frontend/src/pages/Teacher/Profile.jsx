import { useState, useEffect } from 'react';
import { teacherAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await teacherAPI.getProfile();
      setProfile(response.data.teacher);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="teacher" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="teacher" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {profile && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Teacher ID</p>
                <p className="text-lg font-semibold">{profile.teacherId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-semibold">{profile.firstName} {profile.lastName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="text-lg font-semibold">{profile.profile?.experience || 0} years</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Joining Date</p>
                <p className="text-lg font-semibold">
                  {new Date(profile.joiningDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {profile.profile?.bio && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Bio</p>
                <p className="text-gray-800">{profile.profile.bio}</p>
              </div>
            )}

            {profile.profile?.qualifications && profile.profile.qualifications.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Qualifications</p>
                <ul className="list-disc list-inside">
                  {profile.profile.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
