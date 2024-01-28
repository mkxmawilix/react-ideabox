import { isObjectList } from '../../services/Object';

const deleteIdeaRequest = async (ideaId) => {
    const url = `http://localhost:3000/api/ideas/${ideaId}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    return response;
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
