export const getIdeaMessagesJSON = async (ideaId) => {
    if (!ideaId) {
        return;
    }
    const url = `http://localhost:3000/api/messages?ideaId=${ideaId}&_sort=createdAt&_order=desc`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};
