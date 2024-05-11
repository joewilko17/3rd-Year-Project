import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegButton from '../Buttons/RegButton';
import PreviousIngredientCard from '../Cards/PreviousIngredientCard';

// displays what ingredients were previously selected on the recipe results page
const PreviousIngredientsTable = ({selectedIngredients}) => {
    const navigate = useNavigate();

    const handleSearchAgain = () => {
        console.log("Not Implemented Yet");
        navigate('/find-recipes');
    };

    return (
        <div className="w-60 bg-indigo-200 rounded-3xl h-[565px] flex justify-center ">
            <div className='grid-cols-1'>
                <div className="text-black text-xl font-extrabold font-lexend mt-8 flex  items-center justify-center">Selected Ingredients</div>
                <div className='bg-white rounded-3xl h-[405px] w-[180px] left-[6px] relative mt-4 overflow-y-auto no-scrollbar shadow-md'>

                    <ul>
                        {selectedIngredients.map((ingredient, index) => (
                            <li key={index}><PreviousIngredientCard selectedIngredient={ingredient} /></li>
                        ))}
                    </ul>
                </div>
                <div className='mb-6 mt-2'>
                    <RegButton size={"normal"} label={"Search Again"} clickEvent={handleSearchAgain}  />
                </div>
            </div>
        </div>
    );
};

export default PreviousIngredientsTable;