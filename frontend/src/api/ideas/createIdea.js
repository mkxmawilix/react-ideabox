export const createIdeaJSON = async (data) => {
    // change userId to user_id to avoid collection deletion by json-server
    data.user_id = data.userId;
    delete data.userId;

    const response = await fetch("api/ideas", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}
