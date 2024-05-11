import React, { useState } from 'react';
import RegButton from '../Buttons/RegButton';

// filter card component that handles filters for all-recipes table
const FilterCard = ({ FilterNames, setRecipes,filters, setFilters }) => {

    // toggle if a filter is selected
    const toggleFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter((f) => f !== filter));
        } else {
            setFilters([...filters, filter]);
        }
    };

    // check if filters are selected
    const isFilterSelected = (filter) => {
        return filters.includes(filter);
    };

    // clickEvent functionality for submit filters button
    const submitFilters = async () => {
        try {
            let url = '/api/getAllRecipes';
            if (filters.length > 0) {
                url += `?filters=${filters.join(',')}`;
            }
            console.log(url)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();

                console.log("Filtered Recipes:", data);
                setRecipes(data)

            } else {
                console.error("Failed to fetch filtered recipes");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-60 bg-indigo-200 rounded-3xl h-[600px] ml-[20px] mt-20 flex justify-center">
            <div className="grid columns-1">
                <div className="text-black text-2xl font-extrabold font-lexend flex items-center justify-center cursor-default">
                    Filter by Time
                </div>
                <div className="bg-indigo-300 rounded-3xl h-[410px] w-[180px] relative left-[2px]">
                    {FilterNames.Filters.map((filter, index) => (
                        <div key={index} className="flex items-center py-1 px-4 relative top-[15px]">
                            <label
                                onClick={() => toggleFilter(filter)}
                                className={`rounded-3xl w-[150px] text-center text-xl font-extrabold font-lexend cursor-pointer shadow-md p-3 
                                    ${isFilterSelected(filter) ? 'bg-teal-600 text-white' : 'bg-white'} transition duration-300 ease-in-out hover:shadow-xl hover:opacity-100 hover:bg-teal-600`}>
                                {filter}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-4 mr-[1px]">
                    <RegButton
                        size={"normal"}
                        label={"Filter Recipes"}
                        clickEvent={submitFilters}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
