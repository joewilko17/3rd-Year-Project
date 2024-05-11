import React from 'react';
import RecipeCard from '../Cards/RecipeCard';

// displays the results of the find-recipes search page
const RecipeResultTable = ({ RecommendedRecipes }) => {
  
  // Check if RecommendedRecipes is available
  if (!RecommendedRecipes) {
    return null;
  }

  return (
    <div className='bg-indigo-300 w-[300px] h-[680px] right-10 relative rounded-3xl flex justify-center '>
      <div>
        <div className='ml-[6px] mb-2 text-2xl text-black font-bold font-lexand'>Your Favourite Recipes</div>
        <div className='bg-white rounded-3xl w-[270px] h-[620px]  relative  overflow-y-auto no-scrollbar shadow-md'>
          {RecommendedRecipes.map(recipe => (
            <div className='relative mb-5 mt-5 ml-[30px] h-auto' key={recipe.RecipeID}>
              <RecipeCard
                key={recipe.RecipeID}
                recipe={recipe}
                TypeButton={"favourite"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeResultTable;