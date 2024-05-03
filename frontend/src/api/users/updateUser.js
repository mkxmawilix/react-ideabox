import apiClient from '../../services/Api/apiClient';
import { getUserProfileJSON } from "./getUser";

export const updateUserJSON = async (data) => {
    if (!data || !data.userId) {
        return;
    }
    const user = await getUserProfileJSON(data.userId);
    if (!user) {
        throw new Error("Invalid user");
    }

    const newData = {};
    if (data.username) {
        newData.username = data.username;
    }
    if (data.password) {
        newData.password = data.password;
    }
    if (data.avatar) {
        newData.avatar = data.avatar;
    }
    try {
        const response = await apiClient.patch(`/user/${data.userId}`, newData);
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            const message = data.message || `An error has occurred: ${status}`;
            throw new Error(message);
        } else if (error.request) {
            throw new Error("No response received from the server.");
        } else {
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }
}
