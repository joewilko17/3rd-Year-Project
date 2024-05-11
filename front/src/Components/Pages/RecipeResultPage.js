import { useLocation } from 'react-router-dom'
import React from 'react'
import PreviousIngredientsTable from '../Tables/PreviousIngredientsTable'
import RecipeResultTable from '../Tables/RecipeResultTable'

// recipe result page for results from find-recipes page
const RecipeResultPage = () => {
  const location = useLocation();
  const recipeData = location.state ? location.state.recipeData : null;
  const selectedIngredients = location.state ? location.state.selectedIngredients : null;

  // Check if recipeData is available
  if (!recipeData || !selectedIngredients) {
    return (
      <div className='ml-64 mt-24 h-[862px] flex justify-center items-center'>
        <h1>Unexpected Application Error!</h1>
        <p>Recipe data or selected ingredients not available.</p>
      </div>
    );
  }

  // Check if recipes array is available
  if (!recipeData.length) {
    return (
      <div className='ml-64 mt-24 h-[862px] flex justify-center items-center'>
        <h1>Unexpected Application Error!</h1>
        <p>No recipes found.</p>
      </div>
    );
  }
  
  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center '>
      <div className='grid grid-cols-2 relative h-[565px] top-[80px]'>
        <div>
          <PreviousIngredientsTable selectedIngredients={selectedIngredients} />
        </div>
        <div>
          <RecipeResultTable RecommendedRecipes={recipeData} />
        </div>
      </div>
    </div>
  )
}

export default RecipeResultPage