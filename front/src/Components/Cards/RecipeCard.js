import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import IconButton from '../Buttons/IconButton';
import { fetchProfileData } from '../../FetchUtils';

// recipe card component for multiple pages displaying recipe data
const RecipeCard = ({ recipe, TypeButton, removeFromFavorites }) => {
  const { token } = useAuth();
  const [profileData, setProfileData] = useState('')
  useEffect(() => {
    console.log(token)
    if (token) {
      console.log(token)
      fetchProfileData(token, setProfileData);
    }
  }, [token]);

  if (!recipe) {
    return null;
  }



  // clickEvent functionality for handling removal of recipe card from favourites
  const handleRemove = () => {
    removeFromFavorites(recipe.RecipeID);
  };

  const handleFavourite = () => {
    const profileID = profileData.id; // Assuming profile ID is stored in localProfileData

    fetch(`/add-to-favourites?recipeID=${recipe.RecipeID}&profileID=${profileID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-[210px] h-auto bg-indigo-300 rounded-3xl flex justify-center">
      <div className='grid grid-rows-4 h-auto ' style={{ gridTemplateRows: 'auto auto auto 40px' }}>
        <div className="w-[180px] h-auto text-black text-xl font-extrabold  font-lexend  cursor-default ">{recipe.Name}</div>
        <div className='bg-white w-[180px] h-auto rounded-3xl   relative'>
          <div className='text-black text-xl font-extrabold text-center font-lexand  relative top-[5px] mb-4 cursor-default '>
            <ul>
              {recipe.Ingredients.split(',').map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>

        </div>
        <div className='bg-white w-[180px] h-auto rounded-3xl top-[10px] relative justify-center items-center'>
          <div className=' h-auto text-black text-xl font-extrabold text-center font-lexand relative top-[5px] mb-4 cursor-default'>
            <div>
              {recipe.Instructions.split(',').map((instruction, index) => (
                <p key={index}>{instruction.trim()}</p>
              ))}
            </div>
          </div>

        </div>
        <div className='w-6 h-6 relative left-[162px] bottom-[6px]'>
          {TypeButton === "favourite" ? <IconButton icon={"favourite"} clickEvent={handleFavourite} /> : <IconButton icon={"remove"} clickEvent={handleRemove} />}
        </div>

      </div>
    </div>
  );
};

export default RecipeCard;
