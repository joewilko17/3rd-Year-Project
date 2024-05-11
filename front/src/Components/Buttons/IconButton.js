import React from 'react';

// base button for icons used across all pages
const IconButton = ({ icon, clickEvent }) => {
    let iconComponent = null;
    switch (icon) {
        // search button
        case 'search':
            iconComponent = (
                <div className="w-8 h-8 left-[345px] top-[5px] relative cursor-pointer rounded-full z-10 bg-white">
                    <img
                        className='w-7 h-6 left-[2px] top-[4px] relative'
                        src="./search.svg"
                        alt="search"
                    />
                </div>
            );
            break;
        // remove button
        case 'remove':
            iconComponent = (
                <div className="w-6 h-6  absolute cursor-pointer rounded-full transition duration-300 ease-in-out opacity-50 hover:opacity-100 hover:bg-white">
                    <img
                        src="./bin.svg"
                        alt="remove"
                    />
                </div>
            );
            break;
        // favourute button
        case 'favourite':
            iconComponent = (
                <div className="w-6 h-6  absolute cursor-pointer rounded-full transition duration-300 ease-in-out opacity-50 hover:opacity-100 hover:bg-white">
                    <img
                        className='w-5 h-5 left-[2px] top-[3px] relative'
                        src="./heart.svg"
                        alt="favourite"
                    />
                </div>
            );
            break;
        default:
            iconComponent = null;
    }
    return (
        <button onClick={clickEvent}>
            {iconComponent}
        </button>
    );
};

export default IconButton;
