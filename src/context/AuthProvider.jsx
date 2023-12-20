import { useState } from 'react';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true); 
    const logout = () => setIsLoggedIn(false);
    const authValue = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

