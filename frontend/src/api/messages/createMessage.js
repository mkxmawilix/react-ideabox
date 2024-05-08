import apiClient from "../../services/Api/apiClient";

export const createMessageJSON = async ({ideaId, content, userId}) => {
    if (!userId) {
        throw new Error("No userId provided");
    }
    if (!content) {
        throw new Error("No content provided");
    }

    try {
        const response = await apiClient.post("/idea/message", { ideaId, message: content, userId });
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
