import React from 'react'
import { Link } from 'react-router-dom'

const TableButton = ({ label, desc, to }) => {
  return (
    <Link to={to}>
      <div className="bg-teal-700 h-[250px] w-[200px] rounded-3xl flex justify-center items-center ml-2 transition duration-300 ease-in-out hover:shadow-xl hover:opacity-100 hover:bg-teal-600">
        <div className='flex flex-col justify-center items-center'>
          <div className="text-white text-2xl font-extrabold text-center font-lexend">{label}</div>
          <div className='text-white text-sm font-bold text-center'>{desc}</div>
        </div>

      </div>
    </Link>
  )
}

export default TableButton