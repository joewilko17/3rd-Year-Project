import React from 'react';
import IconButton from '../Buttons/IconButton';

// recipe card component for multiple pages displaying recipe data
const RecipeCard = ({ recipe, TypeButton }) => {

  if (!recipe) {
    return null;
  }

  // clickEvent functionality for handling removal of recipe card from favourites
  const handleRemove = () => {
    console.log("not implemented yet.");
    console.log(recipe);
  };

  // clickEvent functionality for handling adding of recipe card to favourites
  const handleFavourite = () => {
    console.log("not implemented yet.");
    console.log(recipe);
  }

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
          {TypeButton === "favourite" ? <IconButton icon={"favourite"} clickEvent={handleRemove} /> : <IconButton icon={"remove"} clickEvent={handleFavourite} />}
        </div>

      </div>
    </div>
  );
};

export default RecipeCard;
