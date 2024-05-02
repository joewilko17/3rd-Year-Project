import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecipeResult = () => {
    const location = useLocation();
    const recipeData = location.state ? location.state.recipeData : null;
    const selectedIngredients = location.state ? location.state.selectedIngredients : null;

    // Check if recipeData is available
    if (!recipeData || !selectedIngredients) {
        return (
            <div className='ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400'>
                <h1>Unexpected Application Error!</h1>
                <p>Recipe data or selected ingredients not available.</p>
            </div>
        );
    }

    // Check if recipes array is available
    if (!recipeData.length) {
        return (
            <div className='ml-64 mt-24 h-[862px] flex justify-center items-center bg-gray-400'>
                <h1>Unexpected Application Error!</h1>
                <p>No recipes found.</p>
            </div>
        );
    }

    return (
        <div className='ml-64 mt-24 h-[862px] flex justify-center items-center  bg-gray-400'>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Selected Ingredients:</h3>
                <ul className="overflow-y-auto h-[550px]">
                    {selectedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-col'>
                <h1 className="text-center mb-16 sticky top-0 bg-gray-300 ">Recipe Results</h1>
                <div className="flex flex-col items-center px-8 w-[400px] max-h-[600px]  border border-gray-500 rounded-lg overflow-y-auto bg-gray-300">
                    {/* Displaying recipeData */}
                    {recipeData.map((recipe) => (
                        <div key={recipe.RecipeID} className="my-4">
                            <h2>{recipe.Name}</h2>
                            <p>Time to Make: {recipe.TimeToMake}</p>
                            <p>Ingredients:</p>
                            <ul>
                                {recipe.Ingredients.split(',').map((ingredient, idx) => (
                                    <li key={idx}>{ingredient}</li>
                                ))}
                            </ul>
                            <p>Instructions:</p>
                            <p>
                                {recipe.Instructions.split(',').map((instruction, idx) => (
                                    <span key={idx}>
                                        {instruction}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
                <Link to="/find-recipe" className="my-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Find More Recipes!
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RecipeResult;
