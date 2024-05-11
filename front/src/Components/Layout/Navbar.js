import React, { useState, useEffect } from 'react';
import NavBarButton from './LayoutButtons/NavbarButton';
import LogoButton from './LayoutButtons/LogoButton';
import { useAuth } from '../../AuthProvider';
import { fetchProfileData } from '../../FetchUtils';

const Navbar = () => {
    const { token } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        console.log(token)
        if (token) {
            console.log(token)
            fetchProfileData(token, setProfileData);
        } else {
            setProfileData(null);
        }
    }, [token]);



    return (
        <div className="w-64 h-screen fixed top-0 left-0 z-20 bg-green-300 transition duration-300 ease-in-out shadow-lg hover:shadow-2xl">
            <div className="fixed top-0 left-0 w-64 h-[190px] flex justify-center items-center">
                <LogoButton
                    to="/"
                />
            </div>
            <div className="w-64 h-screen mt-48 ml-4">
                <div className='flex items-center'>
                    <NavBarButton
                        to="/find-recipes"
                        iconSrc="./knife.svg"
                        altText="Find a Recipe Icon"
                        buttonText="Find a Recipe"
                    />
                </div>
                <div className='mt-6 flex items-center'>
                    <NavBarButton
                        to="/all-recipes"
                        iconSrc=".\cookbook.svg"
                        altText="Recipe Database Icon"
                        buttonText="Recipe Database"
                    />
                </div>
                {profileData ? (
                    <div className="absolute bottom-0 mb-4  flex items-center">
                        <NavBarButton
                            to="/signout"
                            iconSrc=".\logout.svg"
                            altText="Sign Out Icon"
                            buttonText="Sign Out"
                        />
                    </div>
                ) : (
                    <div></div>
                )}


            </div>
        </div>
    );
};

export default Navbar;
