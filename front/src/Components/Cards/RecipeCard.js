import React from 'react';
import IconButton from '../Buttons/IconButton';

// recipe card component for multiple pages displaying recipe data
const RecipeCard = ({ recipe, TypeButton }) => {

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
    <div className=" w-[210px] h-[180px] bg-indigo-300 rounded-3xl flex justify-center">
      <div className='grid grid-rows-4'>
        <div className="text-black text-xl font-extrabold font-lexend cursor-default ">{recipe}</div>
        <div className='bg-white w-[180px] rounded-3xl  relative'>
          <div className='text-black text-xl font-extrabold text-center font-lexand  relative top-[5px] cursor-default '>Ingredients</div>
        </div>
        <div className='bg-white w-[180px] rounded-3xl top-[10px] relative justify-center items-center'>
          <div className='text-black text-xl font-extrabold text-center font-lexand relative top-[5px] cursor-default'>Instructions</div>
        </div>
        <div className='relative left-[162px] bottom-[4px]'>
          {TypeButton == "favourite" ? <IconButton icon={"favourite"} clickEvent={handleRemove} /> : <IconButton icon={"remove"} clickEvent={handleFavourite} />}
        </div>

      </div>
    </div>
  );
};

export default RecipeCard;