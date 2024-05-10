import React from 'react'
import RecipeCard from '../Cards/RecipeCard'

// displays favourited recipes from profile data on the profile page
const FavouritesTable = ({RecipePlaceholder}) => {
  return (
    <div className='bg-indigo-300 w-[300px] h-[475px] rounded-3xl flex justify-center '>
      <div>
        <div className='ml-[6px] mb-2 text-2xl text-black font-bold font-lexand cursor-default'>Your Favourite Recipes</div>
        <div className='bg-white rounded-3xl h-[415px] w-[270px] relative  overflow-y-auto no-scrollbar shadow-md'>
          {RecipePlaceholder.Recipes.map((recipe, index) => (

            <div className='relative mb-5 mt-5 ml-7'><RecipeCard
              key={index}
              recipe={recipe}
            />
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}
export default FavouritesTable