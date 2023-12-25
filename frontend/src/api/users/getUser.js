export const getUserJSON = async (data) => {
    const response = await fetch(`/api/users?email=${data.email}&password=${data.password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}