// MenuButton.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu_Button = ({ to }) => {
  return (
    <Link to={to} >
      <div className="w-36 h-36 bg-green-400 rounded-full flex items-center justify-center transition duration-300 ease-in-out hover:shadow-xl  ring-black hover:opacity-100 hover:bg-indigo-300">
        <img className="w-36 h-36 z-10" src="./anvil-2284960.svg" alt="Menu Icon" />
      </div>
    </Link>
  );
}

export default Menu_Button;
