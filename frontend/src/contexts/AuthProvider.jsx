import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

/** API **/
import { createUserJSON } from "../api/users/createUser";
import { loginUsersJSON } from "../api/users/loginUser";
import { getUserJSON, getUserProfileJSON } from "../api/users/getUser";
import { updateUserJSON } from "../api/users/updateUser";
import { updatePasswordJSON } from "../api/users/updatePassword";

/** Services **/
import { getAuthToken } from "../services/Auth/authToken";
import { isTokenValid } from "../services/Auth/authToken";

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

    const signIn = async ({ email, password }) => {
        try {
            const response = await loginUsersJSON({ email, password });
            if (response) {
                const authHeader = response.token;
                if (!authHeader) {
                    handleFailure("Sign In Failed");
                    return;
                }
                const { username, id: userId } = response.user;
                let token = getAuthToken(authHeader);
                let userObj = { userId: userId, token: token };
                setItem("user", JSON.stringify(userObj));
                setAuth({ token: token, user: username, userId: userId });
                handleSuccess("Login Successful");
                navigate('/', { replace: true });
            } else {
                handleFailure("Login Failed");
            }
        } catch (err) {
            handleError(err, "Login Failed");
        }
    };

    const signUp = async ({ email, password, username, avatar }) => {
        try {
            const response = await createUserJSON({ email, password, username, avatar });
            if (response) {
                const authHeader = response.token;
                if (!authHeader) {
                    handleFailure("Sign Up Failed");
                    return;
                }
                const { username, id: userId } = response.user;
                let token = getAuthToken(authHeader);
                let userObj = { userId: userId, token: token };
                setItem("user", JSON.stringify(userObj));
                setAuth({ token: token, user: username, userId: userId });
                handleSuccess("Sign Up Successful");
                navigate('/', { replace: true });
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
            removeItem("user");
            setAuth({ token: false, user: null, userId: null });
            handleSuccess("Logout Successful");
            navigate('/', { replace: true });
        } catch (error) {
            handleError(error, "Logout Failed");
        }
    };

    const getUserInfo = async (userId) => {
        try {
            const response = await getUserProfileJSON(userId);
            if (response) {
                return response;
            } else {
                handleFailure("User Not Found");
            }
        } catch (error) {
            handleError(error, "User Not Found");
        }
    };

    const updateUserinfo = async ({ auth, userInfo }) => {
        try {
            const response = await updateUserJSON({ userId: auth.userId, username: userInfo.username, avatar: userInfo.avatar });
            if (response && response.user) {
                const { user: { username, userId } } = response;
                setAuth({ token: auth.token, user: username, userId: userId });
                const userObj = JSON.parse(getItem("user"));
                userObj.username = userInfo.username;
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

    const updatePassword = async ({auth, currentPassword, newPassword}) => {
        try {
            const response = await updatePasswordJSON({ userId: auth.userId, currentPassword: currentPassword, newPassword: newPassword });
            if (response && response.token) {
                const token = getAuthToken(response.token);
                const userObj = JSON.parse(getItem("user"));
                userObj.token = token;
                setItem("user", JSON.stringify(userObj));
                setAuth({ token: token, user: auth.user, userId: auth.userId });
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
                    if (isTokenValid(userObj.token, userObj.userId)) {
                        const response = await getUserJSON(userObj.userId);
                        const { user: { username, id: userId } } = response;
                        setAuth({ token: userObj.token, user: username, userId: userId });
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
            getUserInfo,
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