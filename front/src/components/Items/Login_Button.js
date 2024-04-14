import React from 'react'
import { Link } from 'react-router-dom'

const Login_Button = ({ to }) => {
    return (
        <Link to={to}>
            <div className="w-44 h-12 bg-teal-700 rounded-3xl flex justify-center items-center transition duration-300 ease-in-out hover:shadow-xl   hover:opacity-100 hover:bg-teal-600 ">
                <div className="text-white text-base font-extrabold font-lexend">Log In</div>
            </div>
        </Link>
    )
}

export default Login_Button