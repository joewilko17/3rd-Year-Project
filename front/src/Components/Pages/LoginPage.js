import React, { useState } from 'react'
import LoginCard from '../Cards/LoginCard';

// login page for allowing registered users to login
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center '>
      <LoginCard username={username} password={password}
        setUsername={setUsername} setPassword={setPassword} />
    </div>
  )
}

export default LoginPage