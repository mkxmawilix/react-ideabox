import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

/** API **/
import { createUserJSON } from "../api/users/createUser";
import { loginUsersJSON } from "../api/users/loginUser";
import { getUserJSON } from "../api/users/getUser";
import { isAuthenticated } from "../api/users/isAuthenticated";
import { setAuthToken } from "../api/tokens/setAuthToken";
import { deleteAuthToken } from "../api/tokens/deleteAuthToken";

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const { getItem, setItem, removeItem } = useLocalStorage();

    const navigate = useNavigate();

    const handleError = (error, message) => {
        console.error(error.message);
        toast.error(message);
        throw error;
    };

    const handleSuccess = (message) => {
        toast.success(message);
    };

    const handleFailure = (message) => {
        toast.error(message);
    };

    const signIn = async (data) => {
        try {
            const response = await loginUsersJSON(data);
            if (response) {
                let userObj = { userId: response.user.id, token: response.accessToken, username: response.user.username};
                const responseAuth = await setAuthToken(userObj);
                if (responseAuth) {
                    setItem("user", JSON.stringify(userObj));
                    setUser(response.user.username);
                    setAuth(true);
                    handleSuccess("Login Successful");
                    navigate('/', { replace: true });
                } else {
                    handleFailure("Login Failed");
                }
            } else {
                handleFailure("Login Failed");
            }
        } catch (err) {
            handleError(err, "Login Failed");
        }
    };

    const signUp = async (data) => {
        try {
            const response = await createUserJSON(data);
            if (response) {
                let userObj = { userId: response.user.id, token: response.accessToken};
                const responseAuth = await setAuthToken(userObj);
                if (responseAuth) {
                    setItem("user", JSON.stringify(userObj));
                    setAuth(true);
                    setUser(response.user.username);
                    handleSuccess("Sign Up Successful");
                    navigate('/', { replace: true });
                } else {
                    handleFailure("Login Failed");
                }
            }
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
                setUser(null);
                handleSuccess("Logout Successful");
                navigate('/', { replace: true });
            } else {
                handleFailure("Logout Failed");
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
                        const user = await getUserJSON(userObj.userId);
                        setUser(user.username);
                        setAuth(true);
                    } else {
                        setUser(null);
                        setAuth(false);
                    }
                } catch (error) {
                    setUser(null);
                    setAuth(false);
                }
            } else {
                setUser(null);
                setAuth(false);
            }
        };
        checkUser();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const memoedValue = useMemo(
        () => ({
            auth,
            user,
            signIn,
            signOut,
            signUp,
        }),
        [auth, user]
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