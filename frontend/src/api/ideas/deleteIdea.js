import { isObjectList } from '../../services/Object';
import apiClient from '../../services/Api/apiClient';

const deleteIdeaRequest = async (ideaId) => {
    try {
        const response = await apiClient.delete(`/idea/${ideaId}`);
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

export const deleteIdeaJSON = async (data) => {
    if (!data || !data.id) {
        return;
    }
    await deleteIdeaRequest(data.id);
};

export const deleteIdeasJSON = async (data) => {
    if (!data || !isObjectList(data)) {
        return;
    }
    for (const obj of data) {
        await deleteIdeaRequest(obj.id);
    }
};
