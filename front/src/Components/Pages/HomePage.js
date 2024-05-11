import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import { fetchProfileData } from '../../FetchUtils';
import NavigationButton from '../Buttons/NavigationButton';
import WelcomeCard from '../Cards/WelcomeCard';

// index page
const HomePage = () => {
  const { token } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log(token)
    if (token) {
      console.log(token)
      fetchProfileData(token, setProfileData);
    } else {
      setProfileData(null);
    }
  }, [token]);

  return (
    <div className="ml-64 mt-24 h-[862px] flex">
      {token ? (
        <div>
          <WelcomeCard loggedIn={token} profileData={profileData} />
          <div className="relative left-[200px] top-[183px] bg-indigo-200 w-[424px] h-[272px] rounded-3xl flex flex-col  transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
            <div className='top-[45px] left-[12px] relative'>
              <NavigationButton size={"large"} label={"Find a Recipe"} to={"/find-recipes"} />
            </div>
          </div>
          <div className="relative left-[1090px] bottom-[89px] bg-indigo-200 w-[424px] h-[272px] rounded-3xl flex flex-col  transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
            <div className='top-[45px] left-[12px] relative'>
              <NavigationButton size={"large"} label={"All Recipes"} to={"/all-recipes"} />
            </div>
          </div>

        </div>
      ) : (
        <div>
          <WelcomeCard loggedIn={token} profileData={profileData} />
        </div>
      )}

    </div>
  );
}

export default HomePage;
