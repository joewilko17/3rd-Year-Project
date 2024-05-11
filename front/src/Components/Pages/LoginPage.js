import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import LoginCard from '../Cards/LoginCard';

// login page for allowing registered users to login
const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Redirect to home page if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center '>
      <LoginCard username={username} password={password}
        setUsername={setUsername} setPassword={setPassword} />
    </div>
  )
}

export default LoginPage