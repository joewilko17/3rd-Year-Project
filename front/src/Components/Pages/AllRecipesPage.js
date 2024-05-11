import React, { useState, useEffect } from 'react'
import RecipeTable from '../Tables/RecipeTable'
import FilterCard from '../Cards/FilterCard';
import SearchCard from '../Cards/SearchCard'

// page to allow users to browse all recipes
const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [keywords, setKeywords] = useState([])
  const [filters, setFilters] = useState([])
  const [noResults, setNoResults] = useState(false);

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
        if (data.error) {
          setNoResults(true); // Display message on the frontend
          setRecipes([]); // Set recipes to empty array
          console.log("no result")
        } else {
          setNoResults(false);
          setRecipes(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const Filters = [
    { Filters: ['0-30mins', '30mins-1hr', '1hr-2hr', '2hrs+'] }];

  return (
    <div className="ml-64 mt-24 h-[862px] flex justify-left">
    
      <div className="absolute top-[86px] left-64 right-0  p-7  flex justify-between items-center">
        <SearchCard setRecipes={setRecipes} keywords={keywords}
          setKeywords={setKeywords} filters={filters} />
      </div>
      <div className='ml-20 '>
        <RecipeTable AllRecipes={recipes} />
      </div>
      <FilterCard FilterNames={Filters[0]} setRecipes={setRecipes} filters={filters}
        setFilters={setFilters} keywords={keywords} />
      {noResults && (
        <p className="text-red-500 font-bold mt-4 ml-64">No recipes found for the entered keywords.</p>
      )}
    </div>
    
  )
}

export default AllRecipesPage
