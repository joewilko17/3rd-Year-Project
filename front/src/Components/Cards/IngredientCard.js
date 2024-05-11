import React from 'react';

// ingredient card component to hold ingredient data for find-recipes table
const IngredientCard = ({ ingredient, isSelected, toggleIngredient }) => {
  const cardClassName = isSelected ? "w-48 h-36 bg-green-300 rounded-3xl flex justify-center items-center transition duration-100 ease-in-out" : "w-48 h-36 bg-indigo-300 rounded-3xl flex justify-center items-center transition duration-300 ease-in-out hover:bg-green-300";

  return (
    <div className={cardClassName} onClick={() => toggleIngredient(ingredient)}>
        <div className="text-black text-xl font-extrabold font-lexend cursor-default ">{ingredient}</div>
    </div>
  );
};
  
export default IngredientCard;
