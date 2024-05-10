import React, { useState } from 'react'
import SignUpCard from '../Cards/SignUpCard';

// page to allow for unregistered users to create an account
const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center items-center '>
      <SignUpCard username={username} password={password}
        setUsername={setUsername} setPassword={setPassword} />
    </div>
  )
}

export default SignUpPage