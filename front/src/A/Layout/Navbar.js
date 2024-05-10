import React from 'react'
import Nav_Button from '../Items/Nav_Button'
import Menu_Button from '../Items/Menu_Button';

const Navbar = () => {

    const handleButtonClick = () => {
        // Handle button click event
    };

    return (
        <div className="w-64 h-screen fixed top-0 left-0 z-20 bg-green-300 transition duration-300 ease-in-out shadow-lg hover:shadow-2xl">

            <div className="fixed top-0 left-0 w-64 h-[190px] flex justify-center items-center">
                <Menu_Button
                    to="/"
                />
            </div>
            <div className="w-64 h-screen mt-48 ml-4">
                <div className='flex items-center'>
                    <Nav_Button
                        to="/find-recipe"
                        iconSrc="./knife.png"
                        altText="Find a Recipe Icon"
                        buttonText="Find a Recipe"
                    />
                </div>
                {/* <div className='mt-6 flex items-center'>
                    <Nav_Button
                        to="/ingredients-list"
                        iconSrc=".\apple.png"
                        altText="Ingredients List Icon"
                        buttonText="Ingredients List"
                    />
                </div> */}
                <div className='mt-6 flex items-center'>
                    <Nav_Button
                        to="/recipe-database"
                        iconSrc=".\recipe_book.png"
                        altText="Recipe Database Icon"
                        buttonText="Recipe Database"
                    />
                </div>
                <div className="absolute bottom-0 mb-4  flex items-center">

                    <Nav_Button
                        to="/logout"
                        iconSrc=".\logout.png"
                        altText="Sign Out Icon"
                        buttonText="Log Out"
                    />
                </div>

            </div>
        </div>
    )
}

export default Navbar