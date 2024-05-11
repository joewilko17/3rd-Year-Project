import React from 'react';

// unique button for food group categories in find-recipes table
const FoodGroupButton = ({ id, name, active, handleTabClick }) => {
    return (
        <div
            className={`px-4 py-2 cursor-pointer ${active
                ? 'ml-2 mr-2 mt-4 mb-8 w-44 h-12 bg-teal-600 rounded-3xl flex justify-center items-center transition duration-300 ease-in-out hover:shadow-xl hover:opacity-100 hover:bg-teal-600'
                : 'ml-2 mr-2 mt-4 mb-8 w-44 h-12 bg-teal-700 rounded-3xl flex justify-center items-center transition duration-300 ease-in-out hover:shadow-xl hover:opacity-100 hover:bg-teal-600'
                }`}
            onClick={() => handleTabClick(id)}
        >
            <div className="text-white text-lg font-extrabold font-lexend">{name}</div>
        </div>
    );
};

export default FoodGroupButton;