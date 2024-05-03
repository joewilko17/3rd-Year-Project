import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the authentication
const AuthContext = createContext();

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, [isLoggedOut]);

    const login = (userData) => {
        setUser(userData.user);
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
        setIsLoggedOut(false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setIsLoggedOut(true);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
