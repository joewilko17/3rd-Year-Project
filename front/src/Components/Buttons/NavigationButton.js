import React from 'react';
import { Link } from 'react-router-dom';

// base button for navigation throughout non-layout components
const NavigationButton = ({ size, label, to }) => {
    let buttonSizeClass = '';
    let textSizeClass = '';
    switch (size) {
        // normal sized buttons
        case 'normal':
            buttonSizeClass = 'w-44 h-12';
            textSizeClass = "text-base font-extrabold";
            break;
        // large sized buttons
        case 'large':
            buttonSizeClass = 'w-96 h-44';
            textSizeClass = "text-3xl font-extrabold";
            break;
        default:
            buttonSizeClass = 'w-44 h-12';

    }
    return (
        <Link to={to}>
            <div className={`${buttonSizeClass} bg-teal-700 rounded-3xl flex justify-center items-center ml-2 transition duration-300 ease-in-out hover:shadow-xl hover:opacity-100 hover:bg-teal-600`}>
                <div className={`${textSizeClass} text-white  font-lexend`}>{label}</div>
            </div>
        </Link>
    );
};

export default NavigationButton;