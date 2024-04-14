// Header.js
import React from 'react';
import Profile_Button from '../Items/Profile_Button';
import Home_Button from '../Items/Home_Button';

const Header = () => {
    return (
        <div className="fixed top-0 left-64 right-0 bg-white p-4 z-10 flex justify-between items-center transition duration-300 ease-in-out shadow-lg hover:shadow-2xl">
            <Home_Button to="/" />

            <Profile_Button
                to="/myprofile"
            />

        </div>
    );
}

export default Header;




