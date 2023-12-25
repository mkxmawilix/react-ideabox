export const isAuthenticatedJSON = async ({ userId, token }) => {
    if (!userId || !token) {
        return;
    }
    const params = new URLSearchParams({ userId, token });
    const response = await fetch(`api/authenticated?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    return response.json();
}
