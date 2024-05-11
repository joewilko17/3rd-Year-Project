import React from 'react';
import NavigationButton from '../Buttons/NavigationButton';
import TableButton from '../Buttons/TableButton';

const RecipeTable = ({ AllRecipes }) => {
    return (
        <div className="bg-indigo-200 rounded-3xl justify-center items-center h-[750px] w-[1200px] mt-20">
            <div className='bg-white rounded-3xl w-[1100px] relative left-[50px] top-[50px] '>
                <div className='overflow-y-auto no-scrollbar w-[1100px] h-[650px] rounded-3xl shadow-md'>
                    <div className='grid grid-cols-4 gap-4 mt-8 ml-14'>
                        {AllRecipes.map((recipe, index) => (
                            <div className='relative mb-5 mt-5' key={recipe.RecipeID}>
                                <TableButton label={recipe.Name} desc={recipe.TimeToMake} to={`/recipe/${recipe.RecipeID}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeTable;

