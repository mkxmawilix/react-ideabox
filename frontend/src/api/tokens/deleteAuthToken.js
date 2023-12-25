export const deleteAuthToken = async ({ userId, token }) => {
    if (!userId || !token) {
        return;
    }

    const response = await fetch(`api/authenticated?userId=${userId}&token=${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
    }

    const responseGetJson = await response.json();
    await Promise.all(responseGetJson.map(response =>
        fetch(`api/authenticated/${response.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    ));

    return responseGetJson;
}
