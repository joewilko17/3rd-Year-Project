import React from 'react'
import RecipeCard from '../Cards/RecipeCard'

// displays the results of the find-recipes search page
const RecipeResultTable = ({RecipePlaceholder}) => {
  return (
    <div className='bg-indigo-300 w-[300px] h-[680px] right-10 relative rounded-3xl flex justify-center '>
      <div>
        <div className='ml-[6px] mb-2 text-2xl text-black font-bold font-lexand'>Your Favourite Recipes</div>
        <div className='bg-white rounded-3xl w-[270px] h-[620px]  relative  overflow-y-auto no-scrollbar shadow-md'>
          {RecipePlaceholder.map((recipe, index) => (

            <div className='relative mb-5 mt-5 ml-[30px]'><RecipeCard
              key={index}
              recipe={recipe}
              TypeButton={"favourite"}
            />
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeResultTable