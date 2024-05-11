import React, { useState } from 'react';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { loginValidation } from '../../Validation';
import UserDetailsCard from '../Cards/UserDetailsCard';
import RegButton from '../Buttons/RegButton';

// login card component for allowing a user to login to their profile
const LoginCard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    // clickEvent functionality for submitting user details
    const submitDetails = async (e) => {
        e.preventDefault();

        const errors = await loginValidation(username, password);
        setUsernameError(errors.username || '');
        setPasswordError(errors.password || '');

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                login(data); // Call the login function from AuthProvider
                navigate('/');
            } else {
                const data = await response.text();
                console.error('Login error:', data);
                alert('An error occurred during login. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="w-96 h-auto bg-indigo-200 rounded-3xl p-8 flex flex-col items-center">
            <img className='w-[200px] h-[200px] relative top-5' src='./anvil.svg' alt="Anvil" />
            <div className='text-black text-2xl font-extrabold font-lexend mb-8 w-[335px]'>Please login to your account</div>
            <div className='w-full '>
                <UserDetailsCard
                    label="Username"
                    description="Enter your Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className='text-red-600 text-base font-extrabold font-lexend text-center h-[24px]'>{usernameError}</div>
            </div>

            <div className='w-full mt-2'>
                <UserDetailsCard
                    label="Password"
                    description="Enter your Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='text-red-600 text-base font-extrabold font-lexend text-center h-auto'>{passwordError}</div>
            </div>
            <div className="mt-4">
                <RegButton size={"normal"} label={"Login"} clickEvent={submitDetails} />
            </div>

        </div>
    )
}

export default LoginCard;
