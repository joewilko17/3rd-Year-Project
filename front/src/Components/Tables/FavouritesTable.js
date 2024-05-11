import { useEffect, useState } from 'react';
import RecipeCard from '../Cards/RecipeCard'; // Make sure to import your RecipeCard component

const FavouritesTable = ({ localProfileData, setLocalProfileData }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Extracting profile ID from localProfileData
  const profileId = localProfileData.id;

  useEffect(() => {
    fetchFavoriteRecipes();
    console.log("id: ", profileId)
    console.log("ingredients: ", localProfileData.Ingredients)
    console.log("favourites: ", favoriteRecipes)

  }, []); // Re-fetch when localProfileData changes

  // Function to fetch favorite recipes based on profile ID
  const fetchFavoriteRecipes = async () => {
    try {
      const response = await fetch(`/api/getRecipes/${profileId}`);
      const data = await response.json();
      console.log("data ", data)
      // Format the data before setting it
      setFavoriteRecipes(data);
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
    }
  };

  // Function to remove recipe from favorites
  const removeFromFavorites = async (recipeIdToRemove) => {
    try {
      const updatedFavoriteList = favoriteRecipes.filter(recipe => recipe.RecipeID !== recipeIdToRemove);
      setFavoriteRecipes(updatedFavoriteList);
      // Extracting RecipeID and joining them into a string
      const updatedRecipeIds = updatedFavoriteList.map(recipe => recipe.RecipeID).join(',');

      // Update localProfileData as well
      const updatedProfileData = { ...localProfileData, favourites: updatedRecipeIds };
      setLocalProfileData(updatedProfileData);
      console.log("favourites list:  ", updatedFavoriteList)
      console.log("local data fav:  ", localProfileData)

    } catch (error) {
      console.error('Error removing recipe from favorites:', error);
    }
  };

  useEffect(() => {
    console.log("local data fav:  ", localProfileData)
  }, [localProfileData]);

  return (
    <div className='bg-indigo-300 w-[300px] h-[475px] rounded-3xl flex justify-center '>
      <div>
        <div className='ml-[6px] mb-2 text-2xl text-black font-bold font-lexand cursor-default'>Your Favourite Recipes</div>
        <div className='bg-white rounded-3xl h-[415px] w-[270px] relative overflow-y-auto no-scrollbar shadow-md'>
          {/* Render RecipeCard for each favorite recipe */}
          {favoriteRecipes.map((recipe, index) => (
            <div key={index} className='relative mb-5 mt-5 ml-7'>
              <RecipeCard
                key={index}
                recipe={recipe}
                removeFromFavorites={removeFromFavorites}
                localProfileData={localProfileData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesTable;
