export const setAuthToken = async ({ userId, token }) => {
    if (!userId || !token) {
        return;
    }
    const response = await fetch("api/authenticated", {
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
    return response.json();
};