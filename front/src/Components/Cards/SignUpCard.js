import React, { useState } from 'react';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { signupValidation } from '../../Validation';
import UserDetailsCard from '../Cards/UserDetailsCard'
import RegButton from '../Buttons/RegButton';

// sign up card for allowing a user to create a new profile
const SignUpCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // clickEvent functionality for handling submitting new user details
  const submitDetails = async (e) => {
    e.preventDefault();

    // validate the details being submitted
    const errors = await signupValidation(username, password);
    setUsernameError(errors.username || '');
    setPasswordError(errors.password || '');

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        return;
      }

      console.log('User registered successfully');

      const loginResponse = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        login(data);
        localStorage.setItem('token', data.token);
        navigate('/myprofile');
      } else {
        const data = await loginResponse.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className="w-96 h-auto bg-indigo-200 rounded-3xl p-8 flex flex-col items-center">
      <img className='w-[200px] h-[200px] relative top-5' src='./anvil.svg' alt="Anvil" />
      <div className='text-black text-2xl font-extrabold font-lexend mb-8'>Create a new account</div>
      <div className='w-full '>
        <UserDetailsCard
          label="Username"
          description="Enter a Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className='text-red-600 text-base font-extrabold font-lexend text-center h-[24px]'>{usernameError}</div>
      </div>

      <div className='w-full mt-2'>
        <UserDetailsCard
          label="Password"
          description="Enter a Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='text-red-600 text-base font-extrabold font-lexend text-center h-auto '>{passwordError}</div>
      </div>
      <div className="mt-4">
        <RegButton size={"normal"} label={"Create Account"} clickEvent={submitDetails}  />
      </div>

    </div>
  )
}

export default SignUpCard;
