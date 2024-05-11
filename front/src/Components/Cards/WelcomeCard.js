import React, {useState, useEffect} from 'react';
import NavigationButton from '../Buttons/NavigationButton';

// welcome card component for index page
const WelcomeCard = ({ loggedIn, profileData }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (profileData) {
            setUsername(profileData.username);
        } else {
            setUsername(null);
        }
    }, [profileData]);

    return (
        <div className="w-96 h-80 top-10 left-10 relative">
            <div className="w-[1535px] h-[380px] left-0 top-0 relative bg-indigo-300 rounded-3xl transition duration-300 ease-in-out shadow-lg hover:shadow-2xl">

                {loggedIn ? (
                    <div className="relative left-[1050px] top-[53px] bg-indigo-200 w-[424px] h-[272px] rounded-3xl flex flex-col  transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
                        <div className='top-[45px] left-[12px] relative'>
                            <NavigationButton size={"large"} label={"My Profile"} to={"/myprofile"} />
                        </div>
                    </div>
                ) : (
                    <div className="relative left-[1050px] top-[53px] bg-indigo-200 w-[424px] h-[272px] rounded-3xl flex flex-col  transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
                        <div className='top-[20px] left-[12px] relative'>
                            <NavigationButton size={"large"} label={"Get Started"} to={"/find-recipes"} />
                        </div>
                        <div className="flex mt-8 ml-8 relative right-[7px]">
                            <NavigationButton size={"normal"} label={"Login"} to={"/login"} />
                            <NavigationButton size={"normal"} label={"Sign Up"} to={"/signup"} />
                        </div>
                    </div>
                )}


                <div className="w-[600px] h-72 left-[24px] top-[20px] absolute">
                    {loggedIn ? (
                        <span className="text-black text-3xl font-extrabold font-Lexend cursor-default">Welcome {username}!<br /></span>
                    ) : (
                        <span className="text-black text-3xl font-extrabold font-Lexend cursor-default">Welcome to CulinaryCraftsman<br /></span>
                    )}
                    <span className="text-black text-2xl font-extrabold font-Lexend cursor-default">Search for a recipe with our recommendation system or browse all recipes.<br /><br /><br /><br /><br /><br /><br />Happy Cooking!</span>
                </div>
            </div>
        </div >
    );
};

export default WelcomeCard;