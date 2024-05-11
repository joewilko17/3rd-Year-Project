import React from 'react';
import FoodGroupButton from '../Buttons/FoodGroupButton';
import IngredientCard from '../Cards/IngredientCard';

// displays a table of ingredients to select from on the find-recipes page
const IngredientsTable = ({ foodGroups, activeTab, handleTabClick, selectedIngredients, toggleIngredient }) => {
  
  // return null if variables have not been defined yet when loading page [stops error] 
  if (!foodGroups || foodGroups.length === 0) {
    return null; 
  }
  const activeGroup = foodGroups.find(group => group.id === activeTab);
  if (!activeGroup) {
    return null; 
  }

  return (
    <div className="bg-indigo-200 rounded-3xl justify-center items-center h-[670px] w-[820px] ">
      <div className="flex">
        {foodGroups.map(group => (
          <FoodGroupButton
            key={group.id}
            id={group.id}
            name={group.name}
            active={activeTab === group.id}
            handleTabClick={handleTabClick}
          />
        ))}
      </div>
      <div className='bg-white rounded-3xl w-[700px] relative left-[60px]'>
        <div className=' overflow-y-auto no-scrollbar w-[700px] h-[530px] rounded-3xl shadow-md'>
          <div className='grid grid-cols-3 gap-4 mt-8 ml-8 mr-8'>
            {foodGroups.find(group => group.id === activeTab).ingredients.map(ingredient => (
              <IngredientCard
                key={ingredient}
                ingredient={ingredient}
                isSelected={selectedIngredients.includes(ingredient)}
                toggleIngredient={toggleIngredient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsTable;
