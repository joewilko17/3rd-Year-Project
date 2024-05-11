import React, { useState } from 'react';
import ProfileCard from '../Cards/ProfileCard';

// profile page for displaying registed users profile data
const MyProfilePage = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center'>
      <ProfileCard dietaryRestrictions={dietaryRestrictions} dietaryPreferences={dietaryPreferences}
        setDietaryRestrictions={setDietaryRestrictions} setDietaryPreferences={setDietaryPreferences} />
    </div>
  );
};

export default MyProfilePage;