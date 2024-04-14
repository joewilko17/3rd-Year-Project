// FindRecipePage.js
// import React, { useState } from 'react';
// import IngredientCard from '../Recipe/IngredientCard';

// function FindRecipePage() {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('/api/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ input: inputValue })
//       });
//       // Handle response if necessary
//       console.log('Response:', response);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };

//   return (
//     <div className="ml-64 mt-24 h-[90vh] flex justify-center items-center bg-gray-400">
//       <IngredientCard
//       ingredient={"Potato"} 
//       />
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="border rounded px-2 py-1"
//       />
//       <button onClick={handleSubmit} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
//         Submit
//       </button>
//     </div>
//   );
// }

// export default FindRecipePage;

import React, { useState } from 'react';
import IngredientCard from '../Recipe/IngredientCard'; // assuming you have IngredientCard component defined

const FindRecipePage = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // Initial active tab
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State to hold selected ingredients

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
        // Handle response from Flask server
        // Clear selected ingredients if the request was successful
        if (response.ok) {
          setSelectedIngredients([]);
        }
        // Maybe show a success message or handle errors
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };


  // Sample data for demonstration
  const foodGroups = [
    { id: 'tab1', name: 'Group 1', ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'] },
    { id: 'tab2', name: 'Group 2', ingredients: ['Ingredient 4', 'Ingredient 5', 'Ingredient 6','Ingredient 20'] },
    { id: 'tab3', name: 'Group 3', ingredients: ['Ingredient 7', 'Ingredient 8', 'Ingredient 9'] },
    { id: 'tab4', name: 'Group 4', ingredients: ['Ingredient 10', 'Ingredient 11', 'Ingredient 12'] },
  ];

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400">
      <div className="mb-4">
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
        <div className="grid grid-cols-3 gap-4">
          {foodGroups.find(group => group.id === activeTab).ingredients.map(ingredient => (
            <IngredientCard 
              key={ingredient} 
              ingredient={ingredient} 
              isSelected={selectedIngredients.includes(ingredient)} // Pass isSelected prop
              toggleIngredient={toggleIngredient} // Pass toggleIngredient as a prop
            />
          ))}
        </div>
        {/* Button to post the selected card and ingredients to the backend */}
        <button onClick={postIngredients}>Post Selected Card and Ingredients</button>
        
        {/* Div to list selected ingredients */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Ingredients:</h3>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FindRecipePage;
