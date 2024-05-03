import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import Start_Button from '../Items/Start_Button';
import Login_Button from '../Items/Login_Button';
import Signup_Button from '../Items/Signup_Button';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400">
      <div className="w-96 flex flex-col items-center justify-center">
        <Start_Button to="/find-recipe"/>
        {user ? (
          <div>
            {/* Content for logged in user */}
            <h1>Welcome, {user.username}!</h1>
            <Link to="/myprofile">Go to My Profile</Link>
          </div>
        ) : (
          <div className="flex mt-4">
            <Login_Button to="/login"/>
            <Signup_Button to ="/signup"/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

