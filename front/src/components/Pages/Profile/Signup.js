import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthProvider';
import Signup_Form from '../../Items/Signup_Form';

const Signup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home page if user is already logged in
  if (user) {
    navigate('/');
    return null; // Return null to prevent rendering anything
  }

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400'>
      <Signup_Form />
    </div>
  );
}

export default Signup;
