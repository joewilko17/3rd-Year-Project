import React from 'react'
import PreviousIngredientsTable from '../Tables/PreviousIngredientsTable'
import RecipeResultTable from '../Tables/RecipeResultTable'

// recipe result page for results from find-recipes page
const RecipeResultPage = () => {

  const RecipePlaceholder = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'
  ];

  return (
    <div className='ml-64 mt-24 h-[862px] flex justify-center '>
      <div className='grid grid-cols-2 relative h-[565px] top-[80px]'>
        <div>
          <PreviousIngredientsTable selectedIngredients={RecipePlaceholder} />
        </div>
        <div>
          <RecipeResultTable RecipePlaceholder={RecipePlaceholder} />
        </div>
      </div>
    </div>
  )
}

export default RecipeResultPage