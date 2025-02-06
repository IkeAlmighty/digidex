import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // TODO: implement method to 
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ data, isLoading, error, fetchData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };