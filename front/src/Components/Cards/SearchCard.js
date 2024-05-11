import React, { useState } from 'react'
import IconButton from '../Buttons/IconButton'

// search card component for searching for keywords in all-recipes page
const SearchCard = ({ setRecipes, keywords, setKeywords, filters }) => {

    // clickEvent functionality for submitting keywords for search
    const submitSearch = async () => {
        try {
            let url = '/api/getAllRecipes';

            if (keywords || filters.length > 0) {
                url += '?';
                if (keywords) {
                    url += `keywords=${keywords}`;
                }
                if (keywords && filters.length > 0) {
                    url += '&';
                }
                if (filters.length > 0) {
                    url += `filters=${filters.join(',')}`;
                }
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

                console.log("searched recipes:", data);
                setRecipes(data)

            } else {
                console.error("Failed to fetch filtered recipes");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-96 h-11 left-[1125px] relative">
            <div className="w-96 h-11 absolute bg-indigo-200 rounded-3xl" />
            <input
                className="bottom-[10px] shadow appearance-none border rounded-3xl px-2 w-80 h-6 left-[10px] top-[10px] absolute text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search for Recipes"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
            />
            <IconButton icon={"search"} clickEvent={submitSearch} />
        </div>
    )
}

export default SearchCard