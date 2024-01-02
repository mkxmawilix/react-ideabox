export const createUserJSON = async (data) => {
    const response = await fetch("api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (!response.ok && response.status === 400) {
        let message = await response.json();
        throw new Error(`${message}`);
    }
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}