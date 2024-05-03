import apiClient from "../../services/Api/apiClient";

export const updateIdeaJSON = async (data) => {
    if (!data.id) {
        throw new Error("No id provided");
    }
    if (!data.title) {
        throw new Error("No title provided");
    }
    if (!data.description) {
        throw new Error("No description provided");
    }

    try {
        const response = await apiClient.patch(`/idea/${data.id}`, {
            title: data.title,
            description: data.description,
        });
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