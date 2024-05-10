import React from 'react'
import { Link } from 'react-router-dom'

// title button for displaying the website name 
const TitleButton = ({to}) => {
  return (
    <Link to={to}>
        <div className="text-black text-3xl font-extrabold font-Lexend flex-shrink-0 transition duration-300 ease-in-out hover:text-gray-800">CulinaryCraftsman</div>
    </Link>
  )
}

export default TitleButton