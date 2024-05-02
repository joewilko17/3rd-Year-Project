import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientCard from '../Recipe/IngredientCard'; // assuming you have IngredientCard component defined

const FindRecipePage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State to hold selected ingredients
  const [foodGroups, setFoodGroups] = useState([]); // State to hold food groups data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from your database here and update the foodGroups state
    const fetchData = async () => {
      try {
        // Fetch data from your database
        const response = await fetch('/api/getFoodGroups');
        const data = await response.json();
        // Set the data to the foodGroups state
        setFoodGroups(data);
        // Set the active tab to the first food group
        if (data.length > 0) {
          setActiveTab(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array to ensure this effect runs only once

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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


  // Function to send selected ingredients to the Flask server
  const postIngredients = () => {
    // Send selectedIngredients to your Flask server using fetch or any other method
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: selectedIngredients }), // sending selectedIngredients as 'ingredients' field
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse response JSON
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        // Redirect to recipeResult.js with the POST results
        navigate('/recipe-result', { state: { recipeData: data.recipes, selectedIngredients: selectedIngredients } });
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400">
      <div className="mb-4 flex">
        {/* Table */}
        <div style={{ width: '70%' }}>
          <div className="flex">
            {foodGroups.map(group => (
              <div
                key={group.id}
                className={`px-4 py-2 cursor-pointer ${activeTab === group.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => handleTabClick(group.id)}
              >
                {group.name}
              </div>
            ))}
          </div>
          <div className="overflow-y-auto max-h-[600px]"> {/* Adjust max height as needed */}
            <div className="grid grid-cols-3 gap-4">
              {foodGroups.find(group => group.id === activeTab)?.ingredients.map(ingredient => (
                <IngredientCard
                  key={ingredient}
                  ingredient={ingredient}
                  isSelected={selectedIngredients.includes(ingredient)} // Pass isSelected prop
                  toggleIngredient={toggleIngredient} // Pass toggleIngredient as a prop
                />
              ))}
            </div>
          </div>
        </div>
        {/* Selected Ingredients List */}
        <div style={{ width: '30%', marginLeft: '20px' }}>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Ingredients:</h3>
            <ul className="overflow-y-auto h-[550px]">
              {selectedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <button onClick={postIngredients} className="mt-4">Post Selected Card and Ingredients</button>
        </div>
      </div>
    </div>
  );
};
export default FindRecipePage;
