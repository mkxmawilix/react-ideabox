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
import { updateUserJSON } from "../api/users/updateUser";
import { isAuthenticatedJSON } from "../api/users/isAuthenticated";
import { setAuthToken } from "../api/tokens/setAuthToken";
import { deleteAuthToken } from "../api/tokens/deleteAuthToken";

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: false,
        user: null,
        userId: null,
    });
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
                    setAuth({ token: response.accessToken, user: response.user.username, userId: response.user.id });
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
                    setAuth({ token: response.accessToken, user: response.user.username, userId: response.user.id });
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
            if (!userObj) {
                return;
            }
            const response = await deleteAuthToken(userObj);
            if (response) {
                removeItem("user");
                setAuth({ token: false, user: null, userId: null });
                handleSuccess("Logout Successful");
                navigate('/', { replace: true });
            } else {
                handleFailure("Logout Failed");
            }
        } catch (error) {
            handleError(error, "Logout Failed");
        }
    };

    const getUser = async (userId) => {
        try {
            const response = await getUserJSON(userId);
            if (response) {
                return response;
            } else {
                handleFailure("User Not Found");
            }
        } catch (error) {
            handleError(error, "User Not Found");
        }
    };

    const updateUserinfo = async (data) => {
        try {
            const response = await updateUserJSON({userId: data.auth.userId, username: data.userInfo.username, avatar: data.userInfo.avatar});
            if (response) {
                setAuth({ token: data.auth.token, user: response.username, userId: data.auth.userId });
                const userObj = JSON.parse(getItem("user"));
                userObj.username = data.userInfo.username;
                setItem("user", JSON.stringify(userObj));
                handleSuccess("Information Updated");
                navigate('/profile', { replace: true });
            } else {
                handleFailure("Information Update Failed");
            }
        } catch (error) {
            handleError(error, "Information Update Failed");
        }
    };

    const updatePassword = async (data) => {
        try {
            const response = await updateUserJSON({userId: data.auth.userId, password: data.newPassword});
            if (response) {
                handleSuccess("Password Updated");
                signOut();
                navigate('/', { replace: true });
            } else {
                handleFailure("Password Update Failed");
            }
        } catch (error) {
            handleError(error, "Password Update Failed");
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            let userObj = JSON.parse(getItem("user"));
            if (userObj?.token) {
                try {
                    const response = await isAuthenticatedJSON({userId: userObj.userId, token: userObj.token});
                    if (response) {
                        const user = await getUserJSON(response[0].userId);
                        setAuth({ token: userObj.token, user: user.username, userId: response[0].userId });
                    } else {  // invalid token, user not authenticated or token expired
                        removeItem("user");
                        setAuth({ token: false, user: null, userId: null });
                    }
                } catch (error) {
                    removeItem("user");
                    setAuth({ token: false, user: null, userId: null });
                }
            } else {
                setAuth({ token: false, user: null, userId: null });
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
            getUser,
            updateUserinfo,
            updatePassword,
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