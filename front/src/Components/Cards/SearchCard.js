import React, { useState } from 'react'
import IconButton from '../Buttons/IconButton'

// search card component for searching for keywords in all-recipes page
const SearchCard = () => {
    const [keywords, setKeywords] = useState('');

    // clickEvent functionality for submitting keywords for search
    const submitSearch = () => {
        console.log("Not implemented yet");
        console.log(keywords)
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