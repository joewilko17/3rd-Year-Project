import React from 'react';
import UserDetailsCard from '../Cards/UserDetailsCard';
import RegButton from '../Buttons/RegButton';

// login card component for allowing a user to login to their profile
const LoginCard = ({username, password , setUsername, setPassword}) => {
    
    // clickEvent functionality for submitting user details
    const submitDetails = () => {
        console.log("Not implemented yet");
        console.log(username);
        console.log(password);
    };

    return (
        <div className="w-96 h-[600px] bg-indigo-200 rounded-3xl p-8 flex flex-col items-center">
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
            </div>
            <div className='w-[300px] h-[24px] mb-4'>
                <div className='text-red-600 text-base font-extrabold font-lexend text-center'>Validation Errors go here</div>
            </div>

            <div className='w-full mt-2'>
                <UserDetailsCard
                    label="Password"
                    description="Enter your Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='w-[300px] h-[24px] mb-4'>
                <div className='text-red-600 text-base font-extrabold font-lexend text-center'>Validation Errors go here</div>
            </div>
            <RegButton size={"normal"} label={"Login"} clickEvent={submitDetails} />
        </div>
    )
}

export default LoginCard