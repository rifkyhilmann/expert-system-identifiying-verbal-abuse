import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(() => localStorage.getItem('username') || '');

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
