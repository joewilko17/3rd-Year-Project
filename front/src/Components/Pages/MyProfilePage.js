import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import { fetchProfileData } from '../../FetchUtils';
import ProfileCard from '../Cards/ProfileCard';

// profile page for displaying registed users profile data
const MyProfilePage = () => {
  const { token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');

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
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center'>
      <ProfileCard profileData={profileData} dietaryRestrictions={dietaryRestrictions} dietaryPreferences={dietaryPreferences}
        setDietaryRestrictions={setDietaryRestrictions} setDietaryPreferences={setDietaryPreferences} />
    </div>
  );
};

export default MyProfilePage;