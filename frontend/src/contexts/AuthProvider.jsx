import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

const fetchUserJSON = async (data) => {
    const response = await fetch(`/api/users?email=${data.email}&password=${data.password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}


export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const { getItem, setItem, removeItem } = useLocalStorage();

    const signIn = async (data) => {
        try {
            // FAKE API CALL TO GET USER
            const authresult = await fetchUserJSON(data).catch(error => {
                console.error(error.message);
                toast.error("Login Failed");
            });
            if (authresult.length > 0) {
                let userObj = { username: authresult[0].username, token: authresult[0].token};
                setAuth(true);
                setItem("user", JSON.stringify({ ...userObj}));
                toast.success("Login Successfull");
            } else {
                toast.error("Login Failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Login Failed");
        }
    };

    const signUp = async (data) => {  // eslint-disable-line no-unused-vars
        try {
            toast.success("Sign Up Successfull");
        } catch (err) {
            console.error(err);
            toast.error("An Error Occuered");
        }
    };

    const signOut = () => {
        setAuth(false);
        removeItem("user");
        toast.success("Logout Successfull");
    };

    useEffect(() => {
        const userStorage = getItem("user") || null;
        if (userStorage) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const memoedValue = useMemo(
        () => ({
            auth,
            signIn,
            signOut,
            signUp,
        }),
        [auth]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};