export const isAuthenticatedJSON = async ({ userId, token }) => {
    if (!userId || !token) {
        return;
    }
    const params = new URLSearchParams({ userId, token });
    const url = `http://localhost:3000/api/authenticated?${params.toString()}`;
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
