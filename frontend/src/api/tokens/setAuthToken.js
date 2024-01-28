export const setAuthToken = async ({ userId, token }) => {
    if (!userId || !token) {
        return;
    }
    const url = "http://localhost:3000/api/authenticated";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, token })
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
};