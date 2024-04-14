import React from 'react';
import { Link } from 'react-router-dom'

const Nav_Button = ({ to, iconSrc, altText, buttonText }) => {
  return (
    <Link to={to} className="flex items-center">  
      <img className="w-9 h-9 mr-3" src={iconSrc} alt={altText} />
      <div className="text-black text-xl font-extrabold font-lexend transition duration-300 ease-in-out hover:text-gray-900">{buttonText}</div>
    </Link>
  );
}

export default Nav_Button;

