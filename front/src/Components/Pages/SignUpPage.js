import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import SignUpCard from '../Cards/SignUpCard';

// page to allow for unregistered users to create an account
const SignUpPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Redirect to home page if user is already logged in
  if (user) {
    navigate('/');
    return null; // Return null to prevent rendering anything
  }

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center '>
      <SignUpCard username={username} password={password}
        setUsername={setUsername} setPassword={setPassword} />
    </div>
  )
}

export default SignUpPage