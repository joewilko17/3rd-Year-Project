import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegButton from '../Buttons/RegButton';
import SelectedIngredientCard from '../Cards/SelectedIngredientCard';

// displays which ingredients are currently selected on the find-recipes page
const SelectedIngredientTable = ({ selectedIngredients, setSelectedIngredients }) => {
    const navigate = useNavigate();

    // clickEvent functionality for submitting selected ingredients to the backend
    const postIngredients = () => {
        console.log("Not Implemented Yet");
        console.log(selectedIngredients);
        navigate('/recipe-result');
    };

    return (
        <div className="w-60 bg-indigo-200 rounded-3xl h-[670px]  flex justify-center ">
            <div className='grid columns-1'>
                <div className="text-black text-xl font-extrabold font-lexend mt-8 flex  items-center justify-center cursor-default">Selected Ingredients</div>
                <div className='bg-white rounded-3xl h-[510px] w-[180px] left-[6px] relative mt-4 overflow-y-auto no-scrollbar shadow-md'>

                    <ul>
                        {selectedIngredients.map((ingredient, index) => (
                            <li key={index}><SelectedIngredientCard selectedIngredient={ingredient} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} /></li>
                        ))}
                    </ul>
                </div>
                <div className='mb-6 mt-2'>
                    <RegButton size={"normal"} label={"Recommend Recipes"} clickEvent={postIngredients}  />
                </div>
            </div>
        </div>
    );
};

export default SelectedIngredientTable;