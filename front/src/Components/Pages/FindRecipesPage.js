import React, { useState } from 'react';
import IngredientsTable from '../Tables/IngredientTable';
import SelectedIngredientTable from '../Tables/SelectedIngredientsTable';

// page to allow users to search for specific recipes using ingredients table
const FindRecipesPage = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // Initial active tab
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State to hold selected ingredients

  // handles switching to different food group buttons
  const handleTabClick = (tab) => {
    console.log(tab)
    setActiveTab(tab);
  };

  // toggles if an ingredient is selected, adding to selected ingredients if true
  const toggleIngredient = (ingredient) => {
    const index = selectedIngredients.indexOf(ingredient);
    if (index === -1) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients.splice(index, 1);
      setSelectedIngredients(updatedIngredients);
    }
  };

  // placeholder for sprint one
  const foodGroups = [
    { id: 'tab1', name: 'Group 1', ingredients: ['1', '2', '3'] },
    { id: 'tab2', name: 'Group 2', ingredients: ['4', '5', '6'] },
    { id: 'tab3', name: 'Group 3', ingredients: ['7', '8', '9'] },
    { id: 'tab4', name: 'Group 4', ingredients: ['10', '11'] },
    { id: 'tab5', name: 'Group 5', ingredients: ['12', '13', '14'] },
  ];

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-center items-center ">
      <div className='flex relative bottom-[16px]'>
        <IngredientsTable
          foodGroups={foodGroups}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          selectedIngredients={selectedIngredients}
          toggleIngredient={toggleIngredient}
        />
        <div className='ml-10'>
          <SelectedIngredientTable selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
        </div>
      </div>
    </div>

  );
};

export default FindRecipesPage;