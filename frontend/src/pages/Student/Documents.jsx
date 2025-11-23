import { useState, useEffect } from 'react';
import { studentAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await studentAPI.getProfile();
      setProfile(response.data.student);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="student" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {profile && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="text-lg font-semibold">{profile.rollNumber}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-semibold">{profile.firstName} {profile.lastName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="text-lg font-semibold">{profile.class}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Admission Date</p>
                <p className="text-lg font-semibold">
                  {new Date(profile.admissionDate).toLocaleDateString()}
                </p>
              </div>

              {profile.address && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="text-lg font-semibold">{profile.address.city || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Country</p>
                    <p className="text-lg font-semibold">{profile.address.country || 'N/A'}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
