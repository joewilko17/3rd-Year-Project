import React from 'react'
import { useNavigate } from 'react-router-dom';
import RegButton from '../Buttons/RegButton'

// sign out card component for allowing user to sign out
const SignOutCard = () => {
  const navigate = useNavigate();

  // clickEvent functionality for handling user sign out
  const handleSignout = () => {
    console.log("not implemented yet")
    navigate('/')
  };

  // clickEvent functionality for handling cancelling of sign out process
  const handleCancel = () => {
    console.log("not implemented yet")
    navigate('/')
  };

  return (
      <div className="relative bg-indigo-200 w-[424px] h-[272px] rounded-3xl flex flex-col  transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
        <div className='top-[20px] left-[12px] relative'>
          <div className='text-black text-3xl font-extrabold font-Lexend text-center w-96 mt-10'>Are you sure you want to sign out?</div>
        </div>
        <div className="flex mt-[95px] ml-8 relative right-[7px]">
          <RegButton size={"normal"} label={"Sign Out"} clickEvent={handleSignout} />
          <RegButton size={"normal"} label={"Cancel"} clickEvent={handleCancel} />
        </div>
      </div>
  )
}

export default SignOutCard