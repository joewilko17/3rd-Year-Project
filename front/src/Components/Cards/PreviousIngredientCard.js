import React from 'react';

// previous ingredient card component for use in the previous ingredients table
const PreviousIngredientCard = ({selectedIngredient}) => {
    return (
        <div className="w-[165px] h-8 ml-2 mb-2 mt-2 bg-teal-700 rounded-3xl flex items-center transition duration-300 ease-in-out   hover:opacity-100 hover:bg-teal-600 ">
            <div className="text-white text-base font-extrabold font-lexend relative left-4">{selectedIngredient}</div>
        </div>
    );
};

export default PreviousIngredientCard;