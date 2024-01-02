export const getIdeasJSON = async () => {
    const response = await fetch("api/ideas", {
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
