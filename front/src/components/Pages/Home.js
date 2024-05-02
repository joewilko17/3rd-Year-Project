import React from 'react'
import Start_Button from '../Assets/Start_Button';
import Login_Button from '../Assets/Login_Button';
import Signup_Button from '../Assets/Signup_Button';

const Home = () => {
  return (
<div className="ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400">
  <div className="w-96 flex flex-col items-center justify-center">
    <Start_Button to="/find-recipe"/>
    <div className="flex mt-4">
      <Login_Button to="/login"/>
      <Signup_Button to ="/signup"/>
    </div>
  </div>
</div>
  );
}

export default Home;
