import apiClient from '../../services/Api/apiClient';

export const loginUsersJSON = async ({ email, password }) => {
    try {
        const response = await apiClient.post('/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
                throw new Error(data.message || "Invalid credentials.");
            } else {
                throw new Error(`An error has occurred: ${status}`);
            }
        } else if (error.request) {
            throw new Error("No response received from the server.");
        } else {
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }
};
