import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider'; // Make sure to provide the correct path to your AuthContext file

const Logout_Form = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const backHome = () => {
        navigate('/');
    }
    
    
    return (
        <div>
            <div>
                <p>Are you sure you want to logout?</p>
                <button onClick={handleLogout}>Yes, Logout</button>
                <button onClick={backHome}>Cancel</button>
            </div>
        </div>
    );
};

export default Logout_Form;