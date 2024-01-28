export const getIdeasJSON = async () => {
    const url = "http://localhost:3000/api/ideas";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    // change userId to user_id to avoid collection deletion by json-server
    const data = await response.json();
    for (const obj of data) {
        obj.userId = obj.user_id;
        delete obj.user_id;
    }

    return data;
}

export const getIdeaJSON = async (ideaId) => {
    if (!ideaId) {
        throw new Error('No idea ID provided');
    }
    const url = `http://localhost:3000/api/ideas?id=${ideaId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};
