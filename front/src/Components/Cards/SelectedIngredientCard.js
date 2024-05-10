import React from 'react';
import IconButton from '../Buttons/IconButton';

// selected ingredient card component for showing selected ingredients in selected ingredients table
const SelectedIngredientCard = ({ selectedIngredient, setSelectedIngredients, selectedIngredients }) => {

    // clickEvent functionality for removing ingredient from selected ingredients
    const handleRemove = () => {
        setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== selectedIngredient));
    };

    return (
        <div className="w-[165px] h-8 ml-2 mb-2 mt-2 bg-teal-700 rounded-3xl flex items-center transition duration-300 ease-in-out   hover:opacity-100 hover:bg-teal-600 ">
            <div className='left-[135px] bottom-[18px] relative'>
                <IconButton icon={"remove"} clickEvent={handleRemove} />
            </div>
            <div className="text-white text-base font-extrabold font-lexend relative left-4">{selectedIngredient}</div>
        </div>
    );
};

export default SelectedIngredientCard;
