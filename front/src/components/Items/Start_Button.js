import React from 'react'
import { Link } from 'react-router-dom'

const Start_Button = ({ to }) => {
  return (
    <Link to={to}>
      <div className="w-96 h-44 bg-teal-700 rounded-3xl flex justify-center items-center transition duration-300 ease-in-out hover:shadow-xl   hover:opacity-100 hover:bg-teal-600 ">
        <div className="text-white text-3xl font-extrabold font-lexend">Get Started</div>
      </div>
    </Link>
  )
}

export default Start_Button