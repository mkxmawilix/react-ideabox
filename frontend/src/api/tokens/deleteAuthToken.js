export const deleteAuthToken = async ({ userId, token }) => {
    if (!userId || !token) {
        return;
    }

    const url = `http://localhost:3000/api/authenticated?userId=${userId}&token=${token}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
    }

    const responseGetJson = await response.json();
    await Promise.all(responseGetJson.map(response =>
        fetch(`http://localhost:3000/api/authenticated/${response.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    ));

    return responseGetJson;
}
