import React, { useState, useEffect } from 'react';
import IngredientsTable from '../Tables/IngredientTable';
import SelectedIngredientTable from '../Tables/SelectedIngredientsTable';

// page to allow users to search for specific recipes using ingredients table
const FindRecipesPage = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // Initial active tab
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State to hold selected ingredients
  const [foodGroups, setFoodGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getFoodGroups');
        const data = await response.json();
        console.log("Successfully got data:", data)
        setFoodGroups(data);
        if (data.length > 0) {
          setActiveTab(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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