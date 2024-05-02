import React, { useState, useEffect } from 'react';


const RecipeDatabasePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/getAllRecipes')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        setRecipes(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400">
      <div className=' h-[862px] max-h-[862px] overflow-y-auto '>
        <h1 className="text-3xl text-center  sticky top-0 bg-gray-300">Recipe Database</h1>
        <div className="grid grid-cols-3 gap-4">
          {recipes.map(recipe => (
            <div key={recipe.RecipeID} className="border border-gray-700 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">{recipe.Name}</h3>
              <p><strong>Recipe ID:</strong> {recipe.RecipeID}</p>
              <p><strong>Time to Make:</strong> {recipe.TimeToMake}</p>
              <p><strong>Ingredients:</strong> {recipe.Ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.Instructions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDatabasePage;
