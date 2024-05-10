import React from 'react'

// user details card component for allowing user to enter details for submission
const UserDetailsCard = ({ label, description, type, value, onChange }) => {
  return (
    <div className='bg-indigo-300 flex justify-center items-center rounded-3xl w-[310px] h-[65px] ml-[5px]'>
      <div className="relative w-[290px]">
        <div>
          <label className="block text-gray-700 text-sm font-bold relative left-[10px] bottom-[25px]">{label}</label>
        </div>
        {type === "password" ? (
          <input
            className="relative bottom-[10px] shadow appearance-none border rounded-3xl w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder={description}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            className="relative bottom-[10px] shadow appearance-none border rounded-3xl w-full  py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={description}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetailsCard;

