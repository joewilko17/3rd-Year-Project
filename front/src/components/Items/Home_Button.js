import React from 'react'
import { Link } from 'react-router-dom'

const Home_Button = ({to}) => {
  return (
    <Link to={to}>
        <div className="text-black text-3xl font-extrabold font-Lexend flex-shrink-0 transition duration-300 ease-in-out hover:text-indigo-300">CulinaryCraftsman</div>
    </Link>
  )
}

export default Home_Button