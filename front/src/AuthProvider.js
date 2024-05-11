import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, [isLoggedOut]);

    const login = (userData) => {
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
        setIsLoggedOut(false);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsLoggedOut(true);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
