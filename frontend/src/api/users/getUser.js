export const getUserJSON = async (userId) => {
    const url = `http://localhost:3000/api/users/${userId}`;
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
}