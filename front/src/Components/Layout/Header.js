import React from 'react';
import TitleButton from './LayoutButtons/TitleButton';
import ProfileButton from './LayoutButtons/ProfileButton';

const Header = () => {
    return (
        <div className="fixed top-0 left-64 right-0 bg-white p-4 z-10 flex justify-between items-center transition duration-300 ease-in-out shadow-lg hover:shadow-2xl">
            <TitleButton to="/" />
            <ProfileButton to="/myprofile"/>
        </div>
    );
};

export default Header;