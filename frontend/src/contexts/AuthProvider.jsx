import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

/** API **/
import { getUserJSON } from "../api/users/getUser";
import { isAuthenticated } from "../api/users/isAuthenticated";
import { setAuthToken } from "../api/tokens/setAuthToken";
import { deleteAuthToken } from "../api/tokens/deleteAuthToken";

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const { getItem, setItem, removeItem } = useLocalStorage();

    const handleError = (error, message) => {
        console.error(error.message);
        toast.error(message);
    };

    const signIn = async (data) => {
        try {
            // FAKE API CALL
            const authresult = await getUserJSON(data);
            if (authresult.length > 0) {
                let userObj = { userId: authresult[0].id, token: authresult[0].token};
                const response = await setAuthToken(userObj);
                if (response) {
                    setItem("user", JSON.stringify(userObj));
                    setAuth(true);
                    toast.success("Login Successful");
                } else {
                    toast.error("Login Failed");
                }
            } else {
                toast.error("Login Failed");
            }
        } catch (err) {
            handleError(err, "Login Failed");
        }
    };

    const signUp = async (data) => {  // eslint-disable-line no-unused-vars
        try {
            toast.success("Sign Up Successfull");
        } catch (err) {
            handleError(err, "An Error Occurred");
        }
    };

    const signOut = async () => {
        try {
            const userObj = JSON.parse(getItem("user"));
            const response = await deleteAuthToken(userObj);
            if (response) {
                removeItem("user");
                setAuth(false);
                toast.success("Logout Successful");
            } else {
                toast.error("Logout Failed");
            }
        } catch (error) {
            handleError(error, "Logout Failed");
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            let userObj = JSON.parse(getItem("user"));
            if (userObj?.token) {
                try {
                    const response = await isAuthenticated({userId: userObj.userId, token: userObj.token});
                    if (response) {
                        setAuth(true);
                    } else {
                        setAuth(false);
                    }
                } catch (error) {
                    setAuth(false);
                }
            } else {
                setAuth(false);
            }
        };
        checkUser();
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