import React from 'react'
import Start_Button from '../Items/Start_Button';
import Login_Button from '../Items/Login_Button';
import Signup_Button from '../Items/Signup_Button';

const Home = () => {
  return (
    // <div className="ml-64 mt-24 h-screen overflow-y-auto bg-gray-400 flex justify-center items-center">
    //   <div className="w-96 h-44 flex flex-col items-center justify-center">
    //     <div className="w-96 h-44 bg-teal-700 rounded-3xl flex justify-center items-center">
    //       <div className="text-white text-3xl font-extrabold font-lexend">Get Started</div>
    //     </div>
    //   </div>
    // </div>

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
