import apiClient from '../../services/Api/apiClient';

export const getIdeasJSON = async () => {
    try {
        const response = await apiClient.get("/ideas");
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

export const getIdeaJSON = async (ideaId) => {
    if (!ideaId) {
        throw new Error('No idea ID provided');
    }
    try {
        const response = await apiClient.get(`/idea/${ideaId}`);
        return response.data;
    } catch (error) {
        console.log(error);
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
