import React from 'react'
import { Link } from 'react-router-dom'

const Profile_Button = ({ to }) => {
    return (
        <Link to={to}>
            <div className="flex items-center space-x-4">
                <div className="text-black text-2xl font-extrabold font-Lexend transition duration-300 ease-in-out hover:text-gray-900">My Profile</div>
                <div className="w-16 h-16 bg-indigo-300 rounded-full flex items-center justify-center transition duration-300 ease-in-out shadow-lg hover:shadow-xl hover:">
                    <img className="w-10 h-10" src="./user.png" alt="profile-icon" />
                </div>
            </div>
        </Link>
    )
}

export default Profile_Button