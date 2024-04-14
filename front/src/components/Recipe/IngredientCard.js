import React from 'react';

const IngredientCard = ({ ingredient, isSelected, toggleIngredient }) => {
  const cardClassName = isSelected ? "w-48 h-36 bg-teal-700 rounded-3xl flex justify-center items-center transition duration-100 ease-in-out" : "w-48 h-36 bg-indigo-300 rounded-3xl flex justify-center items-center transition duration-300 ease-in-out hover:bg-teal-700";

  return (
    <div className={cardClassName} onClick={() => toggleIngredient(ingredient)}>
        <div className="text-black text-xl font-extrabold font-lexend ">{ingredient}</div>
    </div>
  );
};
  
export default IngredientCard;
