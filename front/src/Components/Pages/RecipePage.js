import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);


    useEffect(() => {
        fetch(`/request/getRecipe?recipe_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data[0]);
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });
    }, [id]);


    if (!recipe || Object.keys(recipe).length === 0) {
        return <div className='ml-64 mt-24 h-[862px] flex justify-center items-center'>Recipe Loading...</div>;
    }

    return (
        <div className='ml-64 mt-24  flex justify-center h-auto w-auto'>
            <div className='bg-indigo-300 flex justify-center rounded-3xl h-auto relative top-20'>
                <div className="grid grid-cols-2 rounded-3xl relative mt-10" style={{ gridTemplateRows: '50px auto', gridTemplateColumns: 'auto auto' }}>
                    <div className="col-span-2 mb-4 text-3xl font-bold ml-8 h-auto">
                        {recipe.Name}
                        
                    </div>
                    <div className="col-span-1 ml-8 h-auto">
                        <div className="text-xl font-bold mb-2">Ingredients:</div>
                        <div className='bg-white rounded-3xl mr-8 overflow-y-auto no-scrollbar mb-10 w-[300px]'>
                            <ul className='relative left-2 top-2'>
                                {recipe.Ingredients.split(',').map((ingredient, index) => (
                                    <li className='w-[280px] relative top-[10px] left-[10px] mr-1 font-semibold' key={index}>{ingredient.trim()}</li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className="col-span-1 h-auto">
                        <div className="text-xl font-bold mb-2">Instructions:</div>
                        <div className='bg-white rounded-3xl mr-9 overflow-y-auto no-scrollbar mb-10 w-[450px]'>
                            <ol className='relative left-2 top-2'>
                                {recipe.Instructions.split(',').map((instruction, index) => (
                                    <li  className='w-[420px] relative top-[10px] left-[10px font-semibold' key={index}>{instruction.trim()}</li>
                                ))}
                            </ol>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default RecipePage;
