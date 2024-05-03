import apiClient from "../../services/Api/apiClient";

export const createIdeaJSON = async ({ title, description, userId }) => {
    if (!title) {
        throw new Error("No title provided");
    }
    if (!description) {
        throw new Error("No description provided");
    }
    if (!userId) {
        throw new Error("No userId provided");
    }
    try {
        const response = await apiClient.post("/idea", { title, description, userId });
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
                throw new Error(data.message || "Invalid request.");
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
