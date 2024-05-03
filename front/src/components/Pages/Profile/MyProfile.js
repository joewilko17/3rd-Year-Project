import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthProvider';
import { fetchProfileData } from '../../../FetchUtils';
import ProfileCard from '../Profile/ProfileCard';

const MyProfile = () => {
  const { token } = useAuth(); // Get the token from the AuthProvider
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log(token)
    if (token) {
      console.log(token)
      fetchProfileData(token, setProfileData);
    }
  }, [token]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400'>
      <ProfileCard profileData={profileData} />
    </div>
  );
};

export default MyProfile;

