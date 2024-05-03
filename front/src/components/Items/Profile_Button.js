import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthProvider'; // Make sure to provide the correct path to your AuthContext file
import { fetchProfileData, fetchLoginStatus } from '../../FetchUtils';

const Profile_Button = ({ to }) => {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [username, setUsername] = useState(null);
    const [isLoggedOut, setIsLoggedOut] = useState(null);

    useEffect(() => {
        console.log(token)
        if (token) {
            console.log(token)
            fetchProfileData(token, setProfileData);
            fetchLoginStatus(setIsLoggedOut);
        } else {
            setUsername(null); // Reset username when logged out
            setIsLoggedOut(true);
        }
    }, [token, isLoggedOut]);

    useEffect(() => {
        if (profileData) {
            setUsername(profileData.username);
        } else {
            setUsername(null);
            setIsLoggedOut(true);
        }
    }, [profileData]);

    return (
        <Link to={isLoggedOut ? '/login' : to}>
            <div className="flex items-center space-x-4">
                <div className="text-black text-2xl font-extrabold font-Lexend transition duration-300 ease-in-out hover:text-indigo-300">
                    {!isLoggedOut ? `Welcome, ${username}` : "Login"}
                </div>
                <div className="w-16 h-16 bg-indigo-300 rounded-full flex items-center justify-center transition duration-300 ease-in-out shadow-lg hover:shadow-xl hover:bg-indigo-400">
                    <img className="w-10 h-10" src="./user.png" alt="profile-icon" />
                </div>
            </div>
        </Link>
    );
};

export default Profile_Button;
