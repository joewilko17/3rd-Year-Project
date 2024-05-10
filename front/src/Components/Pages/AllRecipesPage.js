import React from 'react'
import RecipeTable from '../Tables/RecipeTable'
import FilterCard from '../Cards/FilterCard';
import SearchCard from '../Cards/SearchCard'

// page to allow users to browse all recipes
const AllRecipesPage = () => {

  // placeholder sprint one
  const KeywordsPlaceholder = "Keywords";
  const RecipePlaceholder = [
    { Recipes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'] }];
  const FiltersPlaceholder = [ 
    { Filters: ['Breakfast','Lunch','Dinner'] }];

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-left">
      <div className="absolute top-[86px] left-64 right-0  p-7  flex justify-between items-center">
        <SearchCard Keywords={KeywordsPlaceholder} />
      </div>
      <div className='ml-20 '>
        <RecipeTable RecipePlaceholder={RecipePlaceholder[0]} />
      </div>
      <FilterCard Filters = {FiltersPlaceholder[0]} />
    </div>
  )
}

export default AllRecipesPage
